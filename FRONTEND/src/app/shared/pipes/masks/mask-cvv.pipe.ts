import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCVV',
  standalone: false,
})

// ce n'est pas vraiment un masque, c'est juste pour ajouter des underscores et faire en sorte que la longueur soit toujours de 3
export class MaskCVVPipe implements PipeTransform {
  transform(value: any): string {

    if (value == null || value == undefined) {
      return '- - -';
    }

    return value.toString() + '- '.repeat(3 - value.toString().length);
  }
}
