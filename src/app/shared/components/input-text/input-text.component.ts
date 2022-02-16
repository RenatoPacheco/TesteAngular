import { Component, Input, OnInit } from '@angular/core';

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

  public readonly id: string = Guid.create().toString();

  ngOnInit(): void {
  }
}
