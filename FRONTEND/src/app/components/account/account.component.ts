import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../shared/models/client';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequiredComponent } from '../../shared/components/required/required.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ApiService } from '../../core/services/api.service';
import { UtilsService } from '../../core/services/utils.service';
import { CreditCardModule } from '../../modules/credit-card-module/credit-card.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { MessageModule } from '../../modules/message/message.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-account',
    imports: [CommonModule, CreditCardModule, HeaderComponent, RouterModule, RequiredComponent, SharedModule, MessageModule],
    providers: [ApiService],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy {
  user$: Observable<Client>;
  userForm : FormGroup;
  alreadySubmitted: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb : FormBuilder, private apiService: ApiService, private utilsService: UtilsService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.apiService.getUser();
    const userSubscription = this.user$.subscribe({
      next: (user) => {
        this.userForm = this.fb.group({
          firstnameControl: [user.firstname, [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
          lastnameControl: [user.lastname, [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
          emailControl: [user.email, [Validators.required, Validators.email]],
          loginControl: [user.login, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
          passwordControl: [user.password, [Validators.required]],
          confirmPasswordControl: [user.password, [Validators.required]]
        },
        {
          validators: this.utilsService.passwordMatchValidator
        });
        this.isLoading = false;
      },
      error: () => {
        localStorage.setItem('errorMessage', 'Vous devez être connecté pour accéder à cette page.');
        this.router.navigate(['/login']);
      },
    });
    this.subscriptions.add(userSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.alreadySubmitted = true;

    if(this.userForm.value.passwordControl !== this.userForm.value.confirmPasswordControl) {
      this.successMessage = '';
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (!this.userForm.valid) {
      this.successMessage = '';
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const user = {
      id: 0,
      firstname: this.userForm.value.firstnameControl,
      lastname: this.userForm.value.lastnameControl,
      email: this.userForm.value.emailControl,
      login: this.userForm.value.loginControl,
      password: this.userForm.value.passwordControl
    }

    const userSubscription = this.apiService.updateUser(user).subscribe({
      next: () => {
        this.successMessage = 'Vos informations ont bien été mises à jour.';
        this.errorMessage = '';
      },
      error: (error) => {
        this.successMessage = '';
        this.errorMessage = error.error.message ? error.error.message : 'Une erreur est survenue lors de la mise à jour de vos informations.';
      }
    });

    this.subscriptions.add(userSubscription);
  }

  onDisconnect(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.router.navigate(['/login']);
    }
  }
}
