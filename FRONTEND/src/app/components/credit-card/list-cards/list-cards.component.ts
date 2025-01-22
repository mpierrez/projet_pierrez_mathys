import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from '../../../shared/models/creditCard';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CardService } from '../../../core/services/card.service';

@Component({
  selector: 'app-list-cards',
  standalone: false,
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  cards$: Observable<CreditCard[]>
  valCreditCard: WritableSignal<CreditCard>;
  editCardForm: FormGroup;
  months: number[];
  years: number[];
  alreadySubmitted: boolean;
  hasAtLeastOneCard: boolean;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private apiService: ApiService, private cardService: CardService, private router: Router) {
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    this.years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
    this.alreadySubmitted = false;
    this.valCreditCard = this.cardService.valCardEditing;
  }

  ngOnInit(): void {
    this.cards$ = this.apiService.getCards();
    const cardSubscription = this.cards$.subscribe({
      next: (cards: CreditCard[]) => {
        this.hasAtLeastOneCard = cards.length > 0;
        this.isLoading = false;
      },
      error: () => {
        localStorage.setItem('errorMessage', 'Vous devez être connecté pour accéder à cette page.');
       this.router.navigate(['/login']);
      }
    });
    this.editCardForm = this.fb.group({
      cardNumberControl: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolderNameControl: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      cardMonthControl: ['', [Validators.required]],
      cardYearControl: ['', [Validators.required]],
      cardCvvControl: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
    this.subscriptions.add(cardSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateCard(id: number, card: CreditCard) {
    this.alreadySubmitted = true;
    if (!this.editCardForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const creditCard: CreditCard = {
      id: id,
      number: this.editCardForm.value.cardNumberControl,
      holderName: this.editCardForm.value.cardHolderNameControl,
      type: card.type,
      expirationDate: new Date(this.editCardForm.value.cardYearControl, this.editCardForm.value.cardMonthControl - 1, 1),
      cvv: this.editCardForm.value.cardCvvControl,
    };

    this.apiService.updateCard(id, creditCard).subscribe({
      next: () => {
        this.errorMessage = '';
        this.successMessage = 'La carte a bien été modifiée';
        this.cards$ = this.apiService.getCards(); // on réactualise la liste
        this.cardService.setCardEditing(new CreditCard());
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error ? err.error.message : 'Une erreur est survenue lors de la modification de la carte.';
        console.error(err);
      }
    });
  }

  editCard(card: CreditCard) {
    this.cardService.setCardEditing(card);
    this.editCardForm.patchValue({
      cardNumberControl: card.number,
      cardHolderNameControl: card.holderName,
      cardMonthControl: new Date(card.expirationDate).getMonth() + 1,
      cardYearControl: new Date(card.expirationDate).getFullYear(),
      cardCvvControl: card.cvv,
    });
  }

  cancelEdit() {
    this.cardService.setCardEditing(new CreditCard());
  }

  deleteCard(id: number) {
    this.apiService.deleteCard(id).subscribe({
      next: () => {
        this.errorMessage = '';
        this.successMessage = 'La carte a bien été supprimée';
        this.cards$ = this.apiService.getCards(); // on réactualise la liste
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error ? err.error.message : 'Une erreur est survenue lors de la suppression de la carte.';
        console.error(err);
      },
    });
  }
}
