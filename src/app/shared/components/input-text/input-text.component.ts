import { Component, EventEmitter, forwardRef, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input() public type: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' = 'text';
  @Input() public name: string = '';
  @Input() public placeholder: string = '';
  @Input() public autocomplete : string = '';
  @Input() public required: boolean = false;
  @Input() public readonly : boolean = false;
  @Input() public disabled : boolean = false;

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

  writeValue(value: string|null): void {
    value = value?.toString().trim() ?? null;
    if (this.value != value) {
      this._value = value;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
