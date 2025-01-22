import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { Cake } from '../../shared/models/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private cakes: WritableSignal<Cake[]> = signal([]);

  get valCakes() {
    return this.cakes;
  }

  setCakes(cakes: Cake[]) {
    this.cakes.set(cakes);
  }
}
