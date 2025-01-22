import { Injectable, signal, WritableSignal } from '@angular/core';
import { CreditCard } from '../../shared/models/creditCard';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  private cardInfos : WritableSignal<CreditCard> = signal<CreditCard>(new CreditCard());

  private isFlipped : WritableSignal<boolean> = signal<boolean>(false);
  private cardEditing : WritableSignal<CreditCard> = signal<CreditCard>(new CreditCard());

  get valCardInfos() {
    return this.cardInfos;
  }

  get valIsFlipped () {
    return this.isFlipped;
  }

  get valCardEditing() {
    return this.cardEditing;
  }

  setCardInfo(card: CreditCard) {
    this.cardInfos.set(card);
  }

  setFlipped(flipped: boolean) {
    this.isFlipped.set(flipped);
  }

  setCardEditing(card: CreditCard) {
    this.cardEditing.set(card);
  }

  public getCardType(cardNumber: number): string {
    if(cardNumber == 0 || cardNumber == null) return 'visa';
    if (/^4/.test(cardNumber.toString())) return 'visa';
    if (/^(34|37)/.test(cardNumber.toString())) return 'amex';
    if (/^5[1-5]/.test(cardNumber.toString())) return 'mastercard';
    if (/^6011/.test(cardNumber.toString())) return 'discover';
    if (/^9792/.test(cardNumber.toString())) return 'troy';
    return 'visa';
  }

}
