import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

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

  constructor(private _userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this._userService.login(this.userLogin.value).subscribe((user) => {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
