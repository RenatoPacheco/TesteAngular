import { Attribute, Directive, ElementRef, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[confirmValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ConfirmValidatorDirective),
    multi: true
  }]
})
export class ConfirmValidatorDirective implements Validator {

  constructor(
    @Attribute('confirmValidator')
    public compare: string,
    @Attribute('confirmValidator')
    public name: string
  ) {

  }

  validate(control: AbstractControl): ValidationErrors | null {
    const currentValue = control?.value;
    const compareValue = control.root.get(this.compare)?.value;
    return currentValue === compareValue ? null : {
      confirmValidator: {
        control: this.compare,
        name: this.name,
        toString: () => `This field must be equal to field ${this.name}`
      } as IConfirmValidator
    };
  }
}

export interface IConfirmValidator {
  control: string;
  name: string;
  toString(): string;
}
