import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Client } from '../../../models/client';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RequiredComponent } from '../required/required.component';
import { HeaderComponent } from '../header/header.component';
import { validateTitleControl, getControlName } from '../../app.utils';

@Component({
  selector: 'app-account',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, RouterModule, RequiredComponent],
  standalone: true,
  providers: [ApiService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  user$: Observable<Client>;
  userForm : FormGroup;
  errorMessage: string = '';
  alreadySubmitted: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private fb : FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // si l'utilisateur ne s'est pas encore connecté, on le redirige vers la page de login
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('errorMessage', 'Vous devez être connecté pour accéder à cette page');
      this.router.navigate(['/login']);
    }

    this.userForm = this.fb.group({
      firstnameControl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      lastnameControl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      emailControl: ['', [Validators.required, Validators.email]],
      loginControl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      passwordControl: ['', [Validators.required]],
      confirmPasswordControl: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
    });

    this.user$ = this.apiService.getCurrentUserInfos();
    this.user$.subscribe(user => {
      this.userForm.patchValue({
        firstnameControl: user.firstname,
        lastnameControl: user.lastname,
        emailControl: user.email,
        loginControl: user.login,
        passwordControl: user.password,
        confirmPasswordControl: user.password
      });
    });
  }

  private passwordMatchValidator(control: FormControl): ValidationErrors | null {
      const password = this.userForm?.get('passwordControl')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    }

  protected getErrors(name: string) : string {
    return validateTitleControl(getControlName(this.userForm, name), this.alreadySubmitted);
  };

  onSubmit() {
    this.errorMessage = '';
    this.alreadySubmitted = true;
    const { firstnameControl, lastnameControl, emailControl, loginControl, passwordControl, confirmPasswordControl } = this.userForm.value;

    if(passwordControl != confirmPasswordControl) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (!this.userForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const user = {
      firstname: firstnameControl,
      lastname: lastnameControl,
      email: emailControl,
      login: loginControl,
      password: passwordControl,
    }

    this.apiService.updateUserInfos(user).subscribe(
      (res) => {
        this.showSuccessMessage = true;
      },
      (err) => {
        this.errorMessage = err.error;
        console.error(err);
      }
    );
  }

  onDisconnect() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
