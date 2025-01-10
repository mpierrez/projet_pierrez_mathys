import { FormControl, FormGroup } from "@angular/forms";

export function validateTitleControl(titleControl: FormControl, alreadySubmitted: boolean): string {
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

export function getControlName(formGroup: FormGroup, name: string): FormControl {
    return formGroup.get(name) as FormControl;
}
