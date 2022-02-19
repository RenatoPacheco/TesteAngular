import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  public getErrorValidatorList(values: ValidationErrors | null): string[] {
    const errors: string[] = [];
    if (values) {
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const itens = this.getErrorValidator(key, values[key]).split('\n');
          itens.forEach(item => errors.push(item));
        }
      }
    }
    return errors;
  }

  public getErrorValidator(key: string, value: any): string {
    let error = 'No error';
    switch (key) {
      case 'required':
        error = 'This field is required';
        break;
      case 'minlength':
        error = `This field requires at least ${value.requiredLength} characters`;
        break;
      case 'maxlength':
        error = `This field requires at most ${value.requiredLength} characters`;
        break;
      case 'pattern':
        error = `This field requires a valid ${value.requiredPattern}`;
        break;
      case 'email':
        error = 'This field requires a valid email';
        break;
      case 'min':
        error = `This field requires a value greater than or equal to ${value.min}`;
        break;
      case 'max':
        error = `This field requires a value less than or equal to ${value.max}`;
        break;
      case 'minDate':
        error = `This field requires a date greater than or equal to ${value.minDate}`;
        break;
      case 'maxDate':
        error = `This field requires a date less than or equal to ${value.maxDate}`;
        break;
      case 'minTime':
        error = `This field requires a time greater than or equal to ${value.minTime}`;
        break;
      case 'maxTime':
        error = `This field requires a time less than or equal to ${value.maxTime}`;
        break;
      case 'minDateTime':
        error = `This field requires a date and time greater than or equal to ${value.minDateTime}`;
        break;
      case 'maxDateTime':
        error = `This field requires a date and time less than or equal to ${value.maxDateTime}`;
        break;
      case 'asyncValidator':
        error = `This field requires a valid ${value.name}`;
        break;
      case 'passwordValidator':
        error = value.errors.join('\n');
        break;
      case 'confirmValidator':
        error = `This field must be equal to field ${value.name}`
        break;
      default:
        error = `I do not know what is wrong: ${key}`;
        break;
    }
    return error;
  }
}
