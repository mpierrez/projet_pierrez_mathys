import { OnlyNumbersDirective } from './only-numbers.directive';

describe('NoLettersDirective', () => {
  it('should create an instance', () => {
    const elRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const directive = new OnlyNumbersDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
