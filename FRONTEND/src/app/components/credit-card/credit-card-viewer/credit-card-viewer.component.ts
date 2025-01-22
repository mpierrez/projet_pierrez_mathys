import { Component } from '@angular/core';
import { CardService } from '../../../core/services/card.service';

@Component({
  selector: 'app-credit-card-viewer',
  standalone: false,
  templateUrl: './credit-card-viewer.component.html',
  styleUrls: ['./credit-card-viewer.component.css']
})
export class CreditCardViewerComponent {

  constructor(public cardService : CardService) { }

}
