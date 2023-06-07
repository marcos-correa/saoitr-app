import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LOGIN_MENU,
  LOGOUT_MENU,
  MENU_ITEMS,
} from 'src/app/core/services/constants';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  menuItems = MENU_ITEMS;
  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.userSub();
  }

  logout() {
    this._userService.logout();
  }

  userSub() {
    this._userService.isUserLogged$.subscribe((isLogged) => {
      if (isLogged) {
        this.menuItems = LOGOUT_MENU;
      } else {
        this.menuItems = LOGIN_MENU;
      }
    });
  }

  router(path: string) {
    if (path !== '/logout') {
      this._router.navigate([path]).finally();
    } else {
      this.logout();
    }
  }
}
