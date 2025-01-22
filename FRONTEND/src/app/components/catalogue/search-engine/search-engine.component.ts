import { Component, Injectable, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Cake } from '../../../shared/models/cake';
import { Router } from '@angular/router';
import { CakeType } from '../../../shared/models/cakeType';
import { ApiService } from '../../../core/services/api.service';
import { CakeService } from '../../../core/services/cake.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-search-engine',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit, OnDestroy {
  cakes$: Signal<Cake[]>;  // Signal pour lier la liste des gâteaux
  cakeTypes$: Observable<CakeType[]>;  // Observable pour les types de gâteaux
  searchName: string;
  searchType: CakeType;
  searchMinWeight: number;
  searchMaxWeight: number;
  searchMinPrice: number;
  searchMaxPrice: number;
  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiService, private cakeService: CakeService, private router: Router) {
    this.cakes$ = signal([]);
    this.searchName = '';
    this.searchMinWeight = 0;
    this.searchMaxWeight = 0;
    this.searchMinPrice = 0;
    this.searchMaxPrice = 0;
  }

  ngOnInit(): void {
    this.cakeTypes$ = this.apiService.getCakeTypes();
    const cakesSubscription = this.cakeTypes$.subscribe({
      error: (error) => {
        console.error(error);
        localStorage.setItem('errorMessage', 'Vous devez être connecté pour accéder à cette page.');
        this.router.navigate(['/login']);
      }
    });
    this.subscriptions.add(cakesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  searchCakes() {
    this.apiService.searchCakes(this.searchName, this.searchType.id, this.searchMinWeight, this.searchMaxWeight, this.searchMinPrice, this.searchMaxPrice)
      .subscribe({
        next: (cakes: Cake[]) => {
          this.cakeService.setCakes(cakes);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
