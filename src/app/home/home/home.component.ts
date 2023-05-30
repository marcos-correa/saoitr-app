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
  isLogged: boolean = false;
  showOccurences: boolean = false;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this._userService.isUserLogged$.subscribe((isLogged) => {
      if (isLogged) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  getUsers() {
    if (this.showOccurences) {
      this.getAllusers();
    }
  }

  toggleShowOccurences() {
    this.showOccurences = !this.showOccurences;
  }

  getAllusers() {
    this._userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }
}
