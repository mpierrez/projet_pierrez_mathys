import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Cake } from '../../shared/models/cake';
import { Observable } from 'rxjs';
import { CakeState } from '../../states/cake.state';
import { Store } from '@ngxs/store';
import { CakePaymentLineComponent } from "./cake-payment-line/cake-payment-line.component";
import { Router } from '@angular/router';
import { PanierTotalComponent } from "../panier/panier-total/panier-total.component";
import { CreditCardModule } from '../../modules/credit-card-module/credit-card.module';

@Component({
  selector: 'app-payment',
  imports: [HeaderComponent, CreditCardModule, CakePaymentLineComponent, PanierTotalComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  cakes$: Observable<Cake[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.cakes$ = this.store.select(CakeState.getCakesInCart);
    if(this.store.selectSnapshot(CakeState.getCakesInCart).length === 0) {
      localStorage.setItem("errorMessage", "Vous devez être connecté pour accéder à cette page");
      this.router.navigate(['/login']);
    }
  }
}
