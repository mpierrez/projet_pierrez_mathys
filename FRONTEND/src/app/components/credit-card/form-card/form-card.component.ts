import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreditCard } from '../../../shared/models/creditCard';
import { Router } from '@angular/router';
import { CardService } from '../../../core/services/card.service';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { RemoveAllCakes } from '../../../states/actions/cake.action';

@Component({
  selector: 'app-form-card',
  standalone: false,
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css'],
})

export class FormCardComponent {
  cards$: Observable<CreditCard[]>;
  addCardForm: FormGroup;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  alreadySubmitted: boolean = false;
  errorMessage: string = '';

  constructor(private store: Store, private fb: FormBuilder, public cardService: CardService, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.cards$ = this.apiService.getCards();
    this.addCardForm = this.fb.group({
      cardNumberControl: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolderNameControl: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      cardMonthControl: ['', [Validators.required]],
      cardYearControl: ['', [Validators.required]],
      cardCvvControl: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  onSubmit(): void {
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;

    if(!this.addCardForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    if (checkbox.checked) {
      const creditCard: CreditCard = {
        id: 0,
        number: this.addCardForm.value.cardNumberControl,
        holderName: this.addCardForm.value.cardHolderNameControl,
        type: this.cardService.getCardType(this.addCardForm.value.cardNumberControl),
        expirationDate: new Date(this.addCardForm.value.cardYearControl, this.addCardForm.value.cardMonthControl - 1, 1),
        cvv: this.addCardForm.value.cardCvvControl,
      };

      this.apiService.addCard(creditCard).subscribe({
        error: (error) => {
          this.errorMessage = error.error ? error.error.message : 'Une erreur est survenue lors de l\'ajout de la carte.';
          console.error(error);
        },
      });
    }
    this.store.dispatch(new RemoveAllCakes());
    this.router.navigate(['/home']);
  }

  flipCard(): void {
    this.cardService.setFlipped(!this.cardService.valIsFlipped());
  }

  selectCard(): void {
    const selectedOption = document.querySelector('select option:checked') as HTMLOptionElement;
    const selectedCardId = selectedOption ? selectedOption.value : null;

    if (selectedCardId && selectedCardId !== 'undefined') {
      this.apiService.getCardWithId(Number(selectedCardId)).subscribe({
        next: (card: CreditCard) => {
        const expirationDate = new Date(card.expirationDate);

        this.cardService.valCardInfos.set(card);
        this.addCardForm.patchValue({
          cardNumberControl: card.number,
          cardHolderNameControl: card.holderName,
          cardMonthControl: expirationDate.getMonth() + 1,
          cardYearControl: expirationDate.getFullYear(),
          cardCvvControl: card.cvv,
        });
      },
        error: (err) => {
          console.error('Erreur lors de la récupération de la carte', err);
        }
      });
    }
  }

  updateCard(): void {
    this.cardService.valCardInfos.set({
      id: 0,
      number: this.addCardForm.value.cardNumberControl,
      holderName: this.addCardForm.value.cardHolderNameControl,
      type: this.cardService.getCardType(this.addCardForm.value.cardNumberControl),
      expirationDate: new Date(this.addCardForm.value.cardYearControl, this.addCardForm.value.cardMonthControl - 1, 1),
      cvv: this.addCardForm.value.cardCvvControl,
    });
  }
}
