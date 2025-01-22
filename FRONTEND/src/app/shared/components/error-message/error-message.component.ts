import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent {
  @Input() message: string = '';

  closeMessage() {
    this.message = '';
  }
}
