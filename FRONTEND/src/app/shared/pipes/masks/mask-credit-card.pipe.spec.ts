import { MaskCreditCardPipe } from './mask-credit-card.pipe';

describe('MaskCreditCardPipe', () => {
  it('create an instance', () => {
    const pipe = new MaskCreditCardPipe();
    expect(pipe).toBeTruthy();
  });
});
