import { Component, EventEmitter, forwardRef, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorMessageService } from '@app/shared/services';

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
    private errorMessageService: ErrorMessageService
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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

  private _value: string|null = null;
  public get value(): string|null {
    return this._value;
  }
  @Input() public set value(value: string|null) {
    this.writeValue(value);
  };
  @Output() public valueChange = new EventEmitter<string|null>();

  public readonly id: string = Guid.create().toString();
  public onChange = (_: any) => {}
  public onTouched = (_: any) => {}

  ngOnInit(): void {

  }

  public clear(): void {
    this.writeValue(null);
  }

  showError(): void {
    if (this.ngControl?.control) {
      const errors = this.ngControl.errors ?? null;
      let error = 'No error';
      if (errors) {
        error = this.errorMessageService.getErrorValidatorList(errors)
          .reduce((acc, cur) => `${acc}- ${cur}\n`, '');
      }
      alert(error);
    }
  }

  isEmpty(): boolean {
    return this.value ? false : true;
  }

  isNotEmpty(): boolean {
    return this.value ? true : false;
  }

  public hasLabel(): boolean {
    return this.label ? true : false;
  }

  public isValid(): boolean {
    return (this.ngControl?.valid ?? true)
      && (this.ngControl?.dirty ?? false);
  }

  public isInvalid(): boolean {
    return (this.ngControl?.invalid ?? false)
      && (this.ngControl?.dirty ?? false);
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

  public writeValue(value: string|null): void {
    value = value?.toString().trim() ?? null;
    if (this.value != value) {
      this._value = value;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
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
