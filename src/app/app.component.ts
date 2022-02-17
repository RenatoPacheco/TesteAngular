import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TesteAngular';

  public frmName: string|null = null;
  public frmEmail: string|null = null;
  public frmPassword: string|null = null;
  public frmConfirmPassword: string|null = null;

  public submit(): void {

  }
}
