import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { AddCake } from '../../actions/cake.action';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Cake } from '../../../models/cake';
import { HeaderComponent } from '../header/header.component';
import { Client } from '../../../models/client';

@Component({
    selector: 'app-catalogue',
    imports: [CommonModule, NumberFormatPipe, HeaderComponent],
    providers: [ApiService],
    templateUrl: './catalogue.component.html',
    styleUrl: './catalogue.component.css',
})

export class CatalogueComponent implements OnInit {
  cakes$: Observable<Cake[]>;
  user$: Observable<Client>;

  constructor(private store: Store, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    // si l'utilisateur ne s'est pas encore connecté, on le redirige vers la page de login
    if(localStorage.getItem('token') === null) {
      localStorage.setItem('errorMessage', 'Vous devez être connecté pour accéder à cette page');
      this.router.navigate(['/login']);
    }
    this.cakes$ = this.apiService.getCakes();
    this.user$ = this.apiService.getCurrentUserInfos();
  }

  addToCart(cake: Cake, event: Event) {
    const button = event.target as HTMLElement;
    if(button.textContent === 'Ajouté !') return;

    this.store.dispatch(new AddCake(cake));

    button.textContent = 'Ajouté !';
    button.style.backgroundColor = 'green';
    button.blur();
    setTimeout(() => {
      button.style.backgroundColor = '';
      button.style.borderColor = '';
      button.textContent = 'Ajouter au panier';
    }, 1000);

  }
}
