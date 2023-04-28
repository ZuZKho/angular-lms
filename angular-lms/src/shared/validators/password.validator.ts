import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pass = control.get('registrationInputPass')?.value;
  const confPass = control.get('registrationInputConfirm')?.value;

  if (pass !== confPass) {
    return { notEqual: true };
  } else {
    return null;
  }

};