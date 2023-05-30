import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { USER_MESSAGES } from 'src/app/core/constants/messages';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _userService: UserService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this._userService.createUser(this.userForm.value).subscribe({
      next: (user) => {
        this._messageService.add(USER_MESSAGES.CREATE_USER_SUCCESS);
        this._messageService.add({
          severity: 'info',
          detail: `Usuário: ${user.name} | ${user.email}`,
        });
      },
      error: (error) => {
        let message = '';
        message += error.error.message ? error.error.message : '';
        this._messageService.add({
          severity: 'error',
          summary: 'Erro ao criar usuário',
          detail: message,
        });
      },
      complete: () => {
        this.userForm.reset();
      },
    });
  }
  testHash() {
    this._userService.testHash();
  }
}
