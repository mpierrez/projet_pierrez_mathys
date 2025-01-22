import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CakeState } from '../../states/cake.state';
import { Cake } from '../../shared/models/cake';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CakePaymentLineComponent } from '../payment/cake-payment-line/cake-payment-line.component';
import { PanierTotalComponent } from './panier-total/panier-total.component';
import { MessageModule } from '../../modules/message/message.module';
import { ApiService } from '../../core/services/api.service';

@Component({
    selector: 'app-panier',
    imports: [CommonModule, HeaderComponent, RouterModule, MessageModule, CakePaymentLineComponent, PanierTotalComponent],
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  @Input() resumePanier: boolean = false;
  cakes$: Observable<Cake[]>;
  errorMessage: string = '';

  constructor(private store: Store, private apiService: ApiService, private router: Router) {
    // pour rediriger l'utilisateur vers la page de connexion s'il n'est pas connecté
    this.apiService.getUser().subscribe({
      error: () => {
        localStorage.setItem('errorMessage', 'Vous devez être connecté pour accéder à cette page.');
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    this.cakes$ = this.store.select(CakeState.getCakesInCart);
  }
}
