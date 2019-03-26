import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minValueValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const hasMinValue = control.value < minValue;
    if (hasMinValue) {
      control.markAsDirty();
      return { 'minValue': true }
    }
  };
}
