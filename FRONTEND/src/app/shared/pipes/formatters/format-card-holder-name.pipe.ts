import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCardHolderName',
  standalone: false,
})

export class FormatCardHolderNamePipe implements PipeTransform {
  transform(cardHolderName: any): string {
    return (cardHolderName == null || cardHolderName == '' || cardHolderName == undefined) ? 'PRENOM NOM' : cardHolderName.toUpperCase();
  }
}
