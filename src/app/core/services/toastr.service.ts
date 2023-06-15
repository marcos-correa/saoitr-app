import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  messageServiceSub: BehaviorSubject<Message> = new BehaviorSubject<Message>(
    {} as Message
  );
  message$ = this.messageServiceSub.asObservable();
  constructor() {}

  addMessage(message: Message) {
    this.messageServiceSub.next(message);
  }
  add(message: Message) {
    this.messageServiceSub.next(message);
  }
}
