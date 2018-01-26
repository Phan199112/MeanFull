import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareService {
  public data: any = {};
  private subjects: any = {};

  set(key, value) {
    this.data[key] = value;
    if (!this.subjects.hasOwnProperty(key)) {
      this.subjects[key] = new Subject<any>();
    }
    this.subjects[key].next(value);
  }

  get(key): Observable<any> {
    if (!this.subjects.hasOwnProperty(key)) {
      this.subjects[key] = new Subject<any>();      
    }
    return this.subjects[key].asObservable();
  }
}