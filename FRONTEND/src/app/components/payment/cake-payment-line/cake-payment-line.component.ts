import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CakeState } from '../../../states/cake.state';
import { AddCake, RemoveCake, RemoveCakesOfType } from '../../../states/actions/cake.action';
import { Cake } from '../../../shared/models/cake';
import { Store } from '@ngxs/store';
import { NumberFormatPipe } from '../../../shared/pipes/formatters/number-format.pipe';

@Component({
  selector: 'app-cake-payment-line',
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './cake-payment-line.component.html',
  styleUrl: './cake-payment-line.component.css'
})
export class CakePaymentLineComponent {
  @Input() cakes$: Observable<Cake[]>;
  @Input() resumePanier: boolean = false;

  constructor(private store: Store) {}

  getUniqueCakes(cakes$: Observable<Cake[]>): Observable<Cake[]> {
    return cakes$.pipe(
      map(cakes => {
        const uniqueCakes = cakes.filter((cake, index, self) =>
          self.findIndex(c => c.name === cake.name) === index
        );
        return uniqueCakes.sort((a, b) => a.name.localeCompare(b.name));
      })
    );
  }

  addCake(cake: Cake) {
    this.store.dispatch(new AddCake(cake));
  }

  removeCake(cake: Cake) {
    this.store.dispatch(new RemoveCake(cake));
  }

  removeAllCakes(cake: Cake) {
    if(this.resumePanier) return;
    this.store.dispatch(new RemoveCakesOfType(cake));
  }

  getQuantity(cake: Cake): Observable<number> {
    return this.store.select(CakeState.getQuantityOfCake).pipe(
      map(getQuantityOfCake => getQuantityOfCake(cake))
    );
  }

  getTotalPriceOfACake(cake: Cake): Observable<number> {
    return this.store.select(CakeState.getTotalPriceOfACake).pipe(
      map(getTotalPriceOfACake => getTotalPriceOfACake(cake))
    );
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
}
