import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserScopes } from '@app/shared/models';
import { NotificationService } from '@app/shared/services';
import { ConfirmValidatorDirective } from '@app/shared/directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
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

  public submit(): void {
    this.form.markAllAsTouched();
  }

  public reset(): void {
    this.notificationService.clear();
    this.form.reset();
  }
}
