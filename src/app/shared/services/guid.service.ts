import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class GuidService {

  constructor() { }

  public newGuid(prefix?: string): string {
    prefix = prefix || '';
    if (prefix.length > 0) {
      prefix = `${prefix}-`;
    }
    return `${prefix}${Guid.create().toString()}`;
  }
}
