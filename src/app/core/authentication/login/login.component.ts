import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { USER_MESSAGES } from '../../constants/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  showPassword: boolean = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._userService.isUserLogged$.subscribe((isLogged) => {
      if (isLogged) {
        this.userLogin.reset();
        this._router.navigate(['/home']);
      }
    });
  }

  onSubmit() {
    this._userService.login(this.userLogin.value).subscribe({
      next: (user) => {
        this._messageService.add(USER_MESSAGES.LOGIN_SUCCESS);
      },
      error: (error) => {
        this._messageService.add({
          ...USER_MESSAGES.LOGIN_ERROR,
          detail: error.error.message,
        });
      },
      complete: () => {
        this.userLogin.reset();
      },
    });
  }
}
