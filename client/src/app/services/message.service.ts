import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private listeners = new Subject<any>();

  constructor() { }
  
  listen(): Observable<any>{
    return this.listeners.asObservable();
  }
  filter(filterBy:string){
    this.listeners.next(filterBy);
  }
}
