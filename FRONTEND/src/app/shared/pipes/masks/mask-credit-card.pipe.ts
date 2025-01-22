import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCreditCard',
  standalone: false,
})
export class MaskCreditCardPipe implements PipeTransform {
  transform(value: any): string {

    if(value == null || value == undefined) {
      return '';
    }

    return value.toString()
      .split('')
      .map((char: string, index: number) =>
      index >= 12 && index <= 15 ? char : '*'
      )
      .join('')
      .replace(/(.{4})/g, '$1 ');
  }
}
