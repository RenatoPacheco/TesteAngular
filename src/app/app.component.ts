import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      name: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
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
    const name = this.form.get('name');
    const timeout = 5000;
    console.log('start submit');
    if (name?.disabled) {
      name?.enable();
      console.log('start await');
      setTimeout(() => {
        console.log('end await');
        name?.enable();
      }, timeout);
    } else {
      name?.disable();
      console.log('start await');
      setTimeout(() => {
        console.log('end await');
        name?.disable();
      }, timeout);
    }
    console.log('end submit');
  }
}
