import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { RequiredComponent } from '../required/required.component';
import { LoginResponse } from './loginResponse';
import { getControlName, validateTitleControl } from '../../app.utils';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, RouterModule, RequiredComponent],
    providers: [ApiService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginUserForm : FormGroup;
  errorMessage: string = localStorage.getItem('errorMessage') || '';
  alreadySubmitted: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router : Router) {}

  ngOnInit() {
    this.loginUserForm = this.fb.group({
      loginControl: ['', [Validators.required]],
      passwordControl: ['', [Validators.required]],
    });
  }

  protected getErrors(name: string) : string {
      return validateTitleControl(getControlName(this.loginUserForm, name), this.alreadySubmitted);
  };

  submitForm() {
    this.errorMessage = '';
    localStorage.removeItem('errorMessage');
    this.alreadySubmitted = true;
    if (!this.loginUserForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const { loginControl, passwordControl } = this.loginUserForm.value;

    this.apiService.loginClient(loginControl, passwordControl).subscribe(
      (res: LoginResponse) => {
        this.loginUserForm.reset();
        localStorage.setItem('token', res.accessToken);
        this.router.navigate(['/catalogue']);
      },
      (err) => {
        this.errorMessage = err.error;
        console.error(err);
      }
    );
  }
}
