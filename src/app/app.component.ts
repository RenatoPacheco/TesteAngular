import { ConfirmValidatorDirective } from './shared/directives/confirm-validator.directive';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidatorDirective } from './shared/directives';
import { UserScopes } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', UserScopes.forName(Validators.required)],
      email: ['', UserScopes.forEmail(Validators.required)],
      password: ['', UserScopes.forPassword(Validators.required)],
      confirmPassword: ['', [
        Validators.required,
        new ConfirmValidatorDirective('password', 'Password')
      ]],
    });
  }

  form: FormGroup;

  title = 'TesteAngular';

  public get frmName(): string|null {
    return this.form.get('name')?.value ?? null;
  }

  public get frmEmail(): string|null {
    return this.form.get('email')?.value ?? null;
  }

  public get frmPassword(): string|null {
    return this.form.get('password')?.value ?? null;
  }

  public get frmConfirmPassword(): string|null {
    return this.form.get('confirmPassword')?.value ?? null;
  };

  public submit(): void {
    this.form.markAllAsTouched();
  }

  public reset(): void {
    this.form.reset();
  }
}
