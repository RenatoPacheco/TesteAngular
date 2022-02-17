import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  @Input() public type: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' = 'text';
  @Input() public name: string|null = null;
  @Input() public required: boolean|null = null;
  @Input() public placeholder: string|null = null;
  @Input() public autocomplete : string|null = null;

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
    value = value ?? null;
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
    throw new Error('Method not implemented.');
  }
}
