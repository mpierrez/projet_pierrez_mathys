import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('passwordControl')?.value;
    const confirmPasswordControl = formGroup.get('confirmPasswordControl');

    if (confirmPasswordControl) {
      if (password !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordsMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  validateTitleControl(titleControl: FormControl, alreadySubmitted: boolean): string {
    if(titleControl.errors?.['passwordsMismatch']) {
      return 'Les mots de passe ne correspondent pas';
    }

    if (titleControl.errors && (titleControl?.touched  || alreadySubmitted)) {
      if (titleControl.errors?.['required']) {
        return 'Le champ est obligatoire';
      }

      if (titleControl.errors?.['minlength']) {
        return `Le champ doit contenir au moins ${titleControl.errors['minlength'].requiredLength} caractères`;
      }
      if (titleControl.errors?.['maxlength']) {
        return `Le champ doit contenir au plus ${titleControl.errors['maxlength'].requiredLength} caractères`;
      }

      if(titleControl.errors?.['email']) {
        return 'Le champ doit être une adresse email valide';
      }

      if (titleControl.errors?.['pattern']) {
        return 'Le champ ne respecte pas le format attendu';
      }

      return 'Erreur non répertoriée';
    }
    return '';
  }

  getControlName(formGroup: FormGroup, name: string): FormControl {
    return formGroup.get(name) as FormControl;
  }
}
