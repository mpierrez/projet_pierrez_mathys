import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Client } from '../../shared/models/client';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
  user$: Observable<Client>;
  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.apiService.getUser();
    const userSubscription = this.user$.subscribe({
      error: () => {
        localStorage.setItem('errorMessage', "Vous devez être connecté pour accéder à cette page.");
        this.router.navigate(['/login']);
      },
    });
    this.subscriptions.add(userSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
