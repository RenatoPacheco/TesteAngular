import { Injectable, NgZone } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private zone: NgZone,
    private toastr: ToastrService
  ) { }

  /**
   * show successful notification
   * @param message the message to display
   * @param title the title of the notification
   * @returns
   */
  public success(message: string, title?: string): number {
    let toastId: number  = 0;

    this.zone.run(() => {
      const result: ActiveToast<any> = this.toastr.success(message, title);
      toastId = result.toastId;
    });

    return toastId;
  }

  /**
   * show error notification
   * @param message the message to display
   * @param title the title of the notification
   * @returns
   */
  public error(message: string, title?: string): number {
    let toastId: number  = 0;

    this.zone.run(() => {
      const result: ActiveToast<any> = this.toastr.error(message, title);
      toastId = result.toastId;
    });

    return toastId;
  }

  /**
   * show warning notification
   * @param message the message to display
   * @param title the title of the notification
   * @returns
   */
  public warning(message: string, title?: string): number {
    let toastId: number  = 0;

    this.zone.run(() => {
      const result: ActiveToast<any> = this.toastr.warning(message, title);
      toastId = result.toastId;
    });

    return toastId;
  }

  /**
   * show info notification
   * @param message the message to display
   * @param title the title of the notification
   * @returns
   */
  public info(message: string, title?: string): number {
    let toastId: number  = 0;

    this.zone.run(() => {
      const result: ActiveToast<any> = this.toastr.info(message, title);
      toastId = result.toastId;
    });

    return toastId;
  }

  /**
   * show notification
   * @param message the message to display
   * @param title the title of the notification
   * @returns
   */
  public show(message: string, title?: string): number {
    let toastId: number  = 0;

    this.zone.run(() => {
      const result: ActiveToast<any> = this.toastr.show(message, title);
      toastId = result.toastId;
    });

    return toastId;
  }

  /**
   * Remove all or a single toast by id
   * @param id set the id of the notification to remove
   */
  public clear(id?: number): void {
    this.zone.run(() => this.toastr.clear(id));
  }

  /**
   * Remove and destroy a single notification by id
   * @param id set the id of the notification to remove
   */
  public remove(id: number): void {
    this.zone.run(() => this.toastr.remove(id));
  }
}
