import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[passwordValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PasswordValidatorDirective),
    multi: true
  }]
})
export class PasswordValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = this.checkErrors(control);
    return errors.length < 1 ? null : {
      passwordValidator: {
        errors: errors,
        toString: () => errors.join('\n')
      } as IPasswordValidator
    };
  }

  private checkErrors(control: AbstractControl): string[] {
    const errors: string[] = [];
    const value = control.value?.toString() ?? '';
    if (value.length < 8) {
      errors.push('This field must be at least 8 characters long');
    }
    if (value.length > 16) {
      errors.push('This field cannot be longer than 16 characters');
    }
    if (!value.match(/[a-z]/)) {
      errors.push('This field must contain at least one lowercase letter');
    }
    if (!value.match(/[A-Z]/)) {
      errors.push('This field must contain at least one uppercase letter');
    }
    if (!value.match(/[0-9]/)) {
      errors.push('This field must contain at least one number');
    }
    if (value.match(/\s/)) {
      errors.push('This field not must contain at least one whitespace character');
    }
    if (!value.match(/[^a-zA-Z0-9\s]/)) {
      errors.push('This field must contain at least one special character');
    }
    return errors;
  }
}

export interface IPasswordValidator {
  errors: string[];
  toString(): string;
}
