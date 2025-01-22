import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardViewerComponent } from '../../components/credit-card/credit-card-viewer/credit-card-viewer.component';
import { MaskCreditCardPipe } from '../../shared/pipes/masks/mask-credit-card.pipe';
import { FormatCardHolderNamePipe } from '../../shared/pipes/formatters/format-card-holder-name.pipe';
import { FormatCardMonthPipe } from '../../shared/pipes/formatters/format-card-month.pipe';
import { FormatCardYearPipe } from '../../shared/pipes/formatters/format-card-year.pipe';
import { MaskCVVPipe } from '../../shared/pipes/masks/mask-cvv.pipe';
import { OnlyNumbersDirective } from '../../shared/directives/only-numbers.directive';
import { FormCardComponent } from '../../components/credit-card/form-card/form-card.component';
import { ListCardsComponent } from '../../components/credit-card/list-cards/list-cards.component';
import { MessageModule } from '../message/message.module';
import { CardService } from '../../core/services/card.service';
import { UtilsService } from '../../core/services/utils.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaxLengthNumberDirective } from '../../shared/directives/max-length-number.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreditCardViewerComponent,
    FormCardComponent,
    ListCardsComponent,
    MaskCreditCardPipe,
    FormatCardHolderNamePipe,
    FormatCardMonthPipe,
    FormatCardYearPipe,
    MaskCVVPipe,
    MaxLengthNumberDirective,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule,
    MessageModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [CardService, UtilsService],
  exports: [
    CreditCardViewerComponent,
    FormCardComponent,
    ListCardsComponent,
    MaskCreditCardPipe,
    FormatCardHolderNamePipe,
    FormatCardMonthPipe,
    FormatCardYearPipe,
    MaskCVVPipe,
    MaxLengthNumberDirective,
    OnlyNumbersDirective,
    ReactiveFormsModule
  ]
})
export class CreditCardModule { }
