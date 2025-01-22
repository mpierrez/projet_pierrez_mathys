import { Component, WritableSignal } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { AddCake } from '../../states/actions/cake.action';
import { Cake } from '../../shared/models/cake';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NumberFormatPipe } from '../../shared/pipes/formatters/number-format.pipe';
import { CakeService } from '../../core/services/cake.service';
import { SearchEngineComponent } from './search-engine/search-engine.component';

@Component({
    selector: 'app-catalogue',
    imports: [CommonModule, NumberFormatPipe, HeaderComponent, SearchEngineComponent],
    templateUrl: './catalogue.component.html',
    styleUrl: './catalogue.component.css',
})

export class CatalogueComponent  {
  valCakes: WritableSignal<Cake[]>;

  constructor(private store: Store, private cakeService: CakeService) {
    this.valCakes = this.cakeService.valCakes;
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
