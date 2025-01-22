import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { NumberFormatPipe } from '../../../shared/pipes/formatters/number-format.pipe';
import { Observable } from 'rxjs';
import { CakeState } from '../../../states/cake.state';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier-total',
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './panier-total.component.html',
  styleUrl: './panier-total.component.css'
})
export class PanierTotalComponent {
  @Input() resumePanier: boolean = false;

  constructor(private store: Store, private router: Router) { }

  isCartEmpty(): boolean {
    return this.store.selectSnapshot(CakeState.getCakesInCart).length == 0;
  }

  getSubTotal() : Observable<number> {
    return this.store.select(CakeState.getSubTotal);
  }

  getTva() : Observable<number> {
    return this.store.select(CakeState.getTva);
  }

  getTotalPrice() : Observable<number> {
    return this.store.select(CakeState.getTotalPrice);
  }

  onCartValidation() {
    if (this.store.selectSnapshot(CakeState.getCakesInCart).length === 0) return;
    this.router.navigate(['/paiement']);
  }
}
