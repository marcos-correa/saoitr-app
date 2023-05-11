import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allUsers: User[] = [];
  showLogin: boolean = false;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.users();
  }

  users() {
    this.getAllusers();
  }

  getAllusers() {
    this._userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}
