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

  showUserForm = false;

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

  edituser() {
    this.showUserForm = !this.showUserForm;
  }

  saveUser() {
    let { email, name, password, id } = this.user;
    if (!password) {
      password = null;
    }

    let user = {
      email,
      name,
      password,
    };
    this._userService.updateUser(user, id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      },
      // complete: () => {
      //   this.getUser();
      // }
    });
  }
}
