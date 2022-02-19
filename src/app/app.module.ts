import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from '@app/shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordValidatorDirective } from './shared/directives/password-validator.directive';
import { ConfirmValidatorDirective } from './shared/directives/confirm-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PasswordValidatorDirective,
    ConfirmValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
