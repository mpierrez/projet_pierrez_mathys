import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from '../../shared/components/success-message/success-message.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';



@NgModule({
  declarations: [
    SuccessMessageComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuccessMessageComponent,
    ErrorMessageComponent
  ]
})
export class MessageModule { }
