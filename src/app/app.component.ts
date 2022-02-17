import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      name: '  Jony    ',
      email: '',
      password: '',
      confirmPassword: ''
    });
    this.form.get('name')?.disable();
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

  }
}
