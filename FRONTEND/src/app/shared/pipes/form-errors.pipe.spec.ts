import { TestBed } from '@angular/core/testing';
import { UtilsService } from '../../core/services/utils.service';
import { FormErrorsPipe } from './form-errors.pipe';

describe('FormErrorsPipe', () => {
  it('create an instance', () => {
    const utilsService = TestBed.inject(UtilsService);
    const pipe = new FormErrorsPipe(utilsService);
    expect(pipe).toBeTruthy();
  });
});
