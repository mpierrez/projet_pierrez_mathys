import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  standalone: false,
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css'],
})
export class SuccessMessageComponent {
  @Input() message: string = '';

  closeMessage() {
    this.message = '';
  }
}
