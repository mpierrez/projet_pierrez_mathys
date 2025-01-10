import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { RequiredComponent } from '../required/required.component';
import { getControlName, validateTitleControl } from '../../app.utils';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, CommonModule, RouterModule, RequiredComponent],
    providers: [ApiService],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  registerUserForm : FormGroup;
  errorMessage: string = '';
  alreadySubmitted: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router : Router) {}

  ngOnInit() {
    this.registerUserForm = this.fb.group({
      firstnameControl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      lastnameControl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      emailControl: ['', [Validators.required, Validators.email]],
      loginControl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      passwordControl: ['', [Validators.required]],
      confirmPasswordControl: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
    }
  );
  }

  private passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = this.registerUserForm?.get('passwordControl')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  protected getErrors(name: string) : string {
      return validateTitleControl(getControlName(this.registerUserForm, name), this.alreadySubmitted);
  };

  submitForm() {
    this.errorMessage = '';
    this.alreadySubmitted = true;

    if(this.registerUserForm.value.passwordControl !== this.registerUserForm.value.confirmPasswordControl) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (!this.registerUserForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const client = {
      firstname: this.registerUserForm.value.firstnameControl,
      lastname: this.registerUserForm.value.lastnameControl,
      email: this.registerUserForm.value.emailControl,
      login: this.registerUserForm.value.loginControl,
      password: this.registerUserForm.value.passwordControl
    };

    this.apiService.registerClient(client).subscribe(
      (res) => {
        this.registerUserForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error;
        console.error('Register request failed', error);
      }
    );
  }
}
