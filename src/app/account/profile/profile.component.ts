import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLogged = false;
  user: any = {};

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.isUserLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });

    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
