import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RequiredComponent } from '../../../shared/components/required/required.component';
import { ApiService } from '../../../core/services/api.service';
import { UtilsService } from '../../../core/services/utils.service';
import { MessageModule } from '../../../modules/message/message.module';
import { SharedModule } from '../../../modules/shared/shared.module';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterModule, RequiredComponent, MessageModule, SharedModule],
    providers: [ApiService],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  registerUserForm : FormGroup;
  alreadySubmitted: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private utilsService: UtilsService, private router : Router) {}

  ngOnInit() {
    this.registerUserForm = this.fb.group({
      firstnameControl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      lastnameControl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      emailControl: ['', [Validators.required, Validators.email]],
      loginControl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      passwordControl: ['', [Validators.required]],
      confirmPasswordControl: ['', [Validators.required]]
    }, {
      validators: this.utilsService.passwordMatchValidator
    }
  );
  }

  submitForm() {
    this.alreadySubmitted = true;

    if(this.registerUserForm.value.passwordControl !== this.registerUserForm.value.confirmPasswordControl) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (!this.registerUserForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.isLoading = true;
    const client = {
      id: 0,
      firstname: this.registerUserForm.value.firstnameControl,
      lastname: this.registerUserForm.value.lastnameControl,
      email: this.registerUserForm.value.emailControl,
      login: this.registerUserForm.value.loginControl,
      password: this.registerUserForm.value.passwordControl
    };

    this.apiService.registerClient(client).subscribe({
      next: () => {
        localStorage.removeItem('errorMessage');
        localStorage.setItem('successMessage', 'Votre compte a bien été créé. Vous pouvez maintenant vous connecter.');
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message ? error.error.message : 'Une erreur est survenue lors de la connexion.';
      },
    });
  }
}
