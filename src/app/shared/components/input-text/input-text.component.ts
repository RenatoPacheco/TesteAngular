import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  constructor() { }

  @Input() public type: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' = 'text';
  @Input() public name: string|null = null;
  @Input() public required: boolean|null = null;
  @Input() public placeholder: string|null = null;
  @Input() public autocomplete : string|null = null;

  private _value: string|null = null;
  @Input() public set value(value: string|null) {
    if (this._value != value) {
      this._value = value;
      this.valueChange.emit(this._value);
      console.log(this._value);
    }
  };
  public get value(): string|null {
    return this._value;
  }

  @Output() public valueChange = new EventEmitter<string|null>();

  public readonly id: string = Guid.create().toString();

  ngOnInit(): void {
  }

  public onChange(event: any): void {
    this.value = event.target.value;
  }
}
