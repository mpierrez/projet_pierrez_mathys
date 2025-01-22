import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: false,
})

export class OnlyNumbersDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  @HostListener('input', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const allowedKeys = [
      'Tab', 'Backspace', 'Delete',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Control', 'Meta',
      'A', 'C', 'V', 'X', 'Z', 'Y',
      'Enter', 'Escape',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9'
    ];

    // ctrl + a, c, v, x, z, y
    if (allowedKeys.includes(e.key) || (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'z' || e.key === 'y'))) {
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }
}
