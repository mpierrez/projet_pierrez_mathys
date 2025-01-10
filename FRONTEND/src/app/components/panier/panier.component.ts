import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { CakeState } from '../../states/cake.state';
import { AddCake, RemoveCake, RemoveCakesOfType } from '../../actions/cake.action';
import { Cake } from '../../../models/cake';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-panier',
    imports: [CommonModule, NumberFormatPipe, HeaderComponent],
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  $cakes: Observable<Cake[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.$cakes = this.store.select(CakeState.getCakesInCart);
  }

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
