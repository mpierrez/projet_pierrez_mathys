import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CakeState } from '../../../states/cake.state';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  nb$ : Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.nb$ = this.store.select(CakeState.getNbCakesInCart);
  }
}
