import { ValidationErrors, Validator, Validators } from "@angular/forms";

import { PasswordValidatorDirective } from "@app/shared/directives";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export class User implements IUser {

  public static fromJson(data: IUser): User {
    return new User(data);
  }

  public static fromJsonArray(data: IUser[]): User[] {
    return data.map(User.fromJson);
  }

  constructor(data?: IUser) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
    }
  }

  id: number = 0;
  name: string = '';
  email: string = '';

  public toJson(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }

  public toString(): string {
    return this.name;
  }

  public isNew(): boolean {
    const check = this.id ?? 0;
    return check < 1;
  }

}

export class UserOrderBy {
  public static byName(a: IUser, b:IUser): number {
    const aCompare = a?.name ?? '';
    const bCompare = b?.name ?? '';

    if (aCompare < bCompare) {
      return -1;
    }

    if (aCompare > bCompare) {
      return 1;
    }

    return 0;
  }
}

export class UserScopes {

  public static forId(...args: (ValidationErrors|Validator)[])
    : (ValidationErrors|Validator)[] {
    args.push(Validators.pattern('[0-9]+'));
    return args;
  }

  public static forName(...args: (ValidationErrors|Validator)[])
    : (ValidationErrors|Validator)[] {
    args.push(Validators.minLength(3));
    args.push(Validators.maxLength(300));
    return args;
  }

  public static forEmail(...args: (ValidationErrors|Validator)[])
    : (ValidationErrors|Validator)[] {
    args.push(Validators.email);
    return args;
  }

  public static forPassword(...args: (ValidationErrors|Validator)[])
    : (ValidationErrors|Validator)[] {
    args.push(new PasswordValidatorDirective());
    return args;
  }

}

export class UserMocks {

  public static get(): IUser[] {
    return [
      { id: 1, name: 'User 1', email: 'email1@site.com' },
      { id: 2, name: 'User 2', email: 'email2@site.com' },
      { id: 3, name: 'User 3', email: 'email3@site.com' },
      { id: 4, name: 'User 4', email: 'email4@site.com' },
      { id: 5, name: 'User 5', email: 'email5@site.com' }
    ];
  }

}
