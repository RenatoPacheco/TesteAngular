import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorMessageService, GuidService, NotificationService } from '@app/shared/services';

import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    // I will use ngControl in the constructor in place of this code
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => InputTextComponent),
    //   multi: true
    // }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  constructor(
    @Self() @Optional()
    private ngControl: NgControl,
    private guidService: GuidService,
    private errorMessageService: ErrorMessageService,
    private notificationService: NotificationService
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @ViewChild('element', { static: true }) private element!: ElementRef;

  @Input() public type: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' = 'text';
  @Input() public name: string = '';
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public autocomplete : string = '';
  @Input() public required: boolean = false;
  @Input() public readonly : boolean = false;
  @Input() public showFeedbackError : boolean = true;
  @Input() public showFeedbackSuccess : boolean = false;

  private _disabled: boolean|null = null;
  public get disabled(): boolean {
    return this.ngControl?.disabled ?? this._disabled ?? false;
  }
  @Input() public set disabled(value: boolean) {
    value = (/true/i).test(`${value}`);
    if (value !== this._disabled) {
      if (this.ngControl?.control) {
        if (this._disabled) {
          this.ngControl.control.disable();
        } else {
          this.ngControl.control.enable();
        }
      } else {
        this._disabled = value;
        this.disabledChange.emit(this._disabled);
      }
    }
  }
  @Output() public disabledChange = new EventEmitter<boolean>();

  private _value: string = '';
  public get value(): string {
    return this._value;
  }
  @Input() public set value(value: string) {
    this.writeValue(value);
  };
  @Output() public valueChange = new EventEmitter<string>();

  public readonly id: string = this.guidService.newGuid('input-text');
  public onChange = (_: any) => {}
  public onTouched = (_: any) => {}

  public ngOnInit(): void {

  }

  public clear(): void {
    this.writeValue('');
    if (this.ngControl?.control) {
      this.ngControl.control.markAsPristine();
      this.ngControl.control.markAsUntouched();
    }
  }

  public clearAndFocus(): void {
    this.clear();
    this.element.nativeElement.focus();
  }

  public showError(): void {
    const errors = this.ngControl?.errors || null;
    if (errors) {
      this.notificationService.clear();
      this.errorMessageService.getErrorValidatorList(errors).forEach(error => {
        this.notificationService.error(error);
      });
    }
  }

  public isEmpty(): boolean {
    return this.value ? false : true;
  }

  public isNotEmpty(): boolean {
    return this.value ? true : false;
  }

  public hasLabel(): boolean {
    return this.label ? true : false;
  }

  public isValid(): boolean {
    return (this.ngControl?.valid ?? true)
      && ((this.ngControl?.dirty ?? false)
        || (this.ngControl?.touched ?? false));
  }

  public isInvalid(): boolean {
    return (this.ngControl?.invalid ?? false)
      && ((this.ngControl?.dirty ?? false)
        || (this.ngControl?.touched ?? false));
  }

  public hasFeedbackError(): boolean {
    return this.showFeedbackError
      && this.isInvalid();
  }

  public hasFeedbackSuccess(): boolean {
    return this.showFeedbackSuccess
      && this.isValid();
  }

  public hasFeedback(): boolean {
    return this.hasFeedbackError()
      || this.hasFeedbackSuccess();
  }

  public writeValue(value: string): void {
    value = value?.toString() ?? '';
    if (this.value !== value) {
      this._value = value;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    } else {
      this.element.nativeElement.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      this.disabledChange.emit(this._disabled);
    }
  }
}
