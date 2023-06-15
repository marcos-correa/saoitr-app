import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { USER_MESSAGES } from 'src/app/core/constants/messages';
import { ToastrService } from 'src/app/core/services/toastr.service';
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

  showPassword: boolean = false;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this._userService.createUser(this.userForm.value).subscribe({
      next: (user) => {
        this._toastr.add(USER_MESSAGES.CREATE_USER_SUCCESS);
        this._toastr.add({
          severity: 'info',
          detail: `Usuário: ${user.name} | ${user.email}`,
          life: 10000,
        });

        this._router.navigate(['/login']).finally(() => {});
      },
      error: (error) => {
        let detail = '';
        detail += error.error.message ? error.error.message : '';
        this._messageService.add({
          severity: 'error',
          summary: 'Erro ao criar usuário',
          detail,
        });
      },
      complete: () => {
        this.userForm.reset();
      },
    });
  }
}
