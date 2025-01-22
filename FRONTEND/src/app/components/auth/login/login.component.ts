import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RequiredComponent } from '../../../shared/components/required/required.component';
import { ApiService } from '../../../core/services/api.service';
import { MessageModule } from '../../../modules/message/message.module';
import { SharedModule } from '../../../modules/shared/shared.module';

@Component({
    selector: 'app-login',
    imports: [RouterModule, RequiredComponent, MessageModule, SharedModule, ReactiveFormsModule],
    providers: [ApiService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginUserForm : FormGroup;
  alreadySubmitted: boolean = false;
  successMessage: string = localStorage.getItem('successMessage') || '';
  errorMessage: string = localStorage.getItem('errorMessage') || '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router : Router) {}

  ngOnInit(): void {
    this.loginUserForm = this.fb.group({
      loginControl: ['', [Validators.required]],
      passwordControl: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.alreadySubmitted = true;
    localStorage.removeItem('errorMessage');
    localStorage.removeItem('successMessage');

    if (!this.loginUserForm.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const { loginControl, passwordControl } = this.loginUserForm.value;

    this.isLoading = true;
    this.apiService.loginClient(loginControl, passwordControl).subscribe({
      next: () => {
        this.isLoading = false;
        localStorage.removeItem('errorMessage');
        localStorage.removeItem('successMessage');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        this.successMessage = '';
        this.errorMessage = error.error ? error.error.message : 'Une erreur est survenue lors de la connexion.';
      },
    });
  }
}
