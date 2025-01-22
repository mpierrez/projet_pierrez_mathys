import { Directive, HostListener, ElementRef, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaxLengthNumber]',
  standalone: false,
})

export class MaxLengthNumberDirective {
  @Input('appMaxLengthNumber') maxLength: number = 10;

  constructor(private el: ElementRef, @Self() private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    if (inputElement.value.length > this.maxLength) {
      const truncatedValue = inputElement.value.slice(0, this.maxLength);
      inputElement.value = truncatedValue;

      // ça me permet de changer la valeur dans le FormBuidler
      if (this.control) {
        this.control?.control?.setValue(parseInt(truncatedValue), { emitEvent: false });
      }
    }
  }
}
