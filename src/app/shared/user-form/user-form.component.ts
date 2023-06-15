import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserCreation } from 'src/app/core/interfaces/user';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: Partial<UserCreation> = {};
  @Output() userChange = new EventEmitter<Partial<UserCreation>>();

  @Output() hide = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() update = new EventEmitter();

  @Input() editFields?: boolean = false;

  @Input() userId?: number;

  constructor() {}

  onUserChange() {
    this.userChange.emit(this.user);
  }

  ngOnInit(): void {
    // this.getUserId();
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  hideDialog() {
    console.log('hideDialog');
    this.hide.emit();
  }

  saveUser() {
    this.save.emit();
  }
}
