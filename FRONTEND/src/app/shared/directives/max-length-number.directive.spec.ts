import { MaxLengthNumberDirective } from './max-length-number.directive';

describe('MaxLengthNumberDirective', () => {
  it('should create an instance', () => {
    const elRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const controlMock = jasmine.createSpyObj('NgControl', ['control']);
    const directive = new MaxLengthNumberDirective(elRefMock, controlMock);
    expect(directive).toBeTruthy();
  });
});
