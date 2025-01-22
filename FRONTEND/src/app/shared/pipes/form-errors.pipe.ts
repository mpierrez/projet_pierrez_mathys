import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../core/services/utils.service';

@Pipe({
  name: 'getErrors',
  pure: false,
  standalone: false,
})
export class FormErrorsPipe implements PipeTransform {

  constructor(private utilsService: UtilsService) {}

  transform(formGroup: FormGroup, controlName: string, alreadySubmitted: boolean): string {
    const control = formGroup.get(controlName);
    if (!control) {
      return 'Champ introuvable';
    }
    return this.utilsService.validateTitleControl(control as FormControl, alreadySubmitted);
  }
}
