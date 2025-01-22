import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsPipe } from '../../shared/pipes/form-errors.pipe';

@NgModule({
  declarations: [
    FormErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormErrorsPipe
  ]
})
export class SharedModule { }
