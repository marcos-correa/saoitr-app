import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  menuItems = [
    {
      name: 'Início',
      icon: 'fa-home',
      path: '/home',
    },
    {
      name: 'Criar Usuário',
      icon: 'fa-user-plus',
      path: '/create-user',
    },
    {
      name: 'Login',
      icon: 'fa-sign-in',
      path: '/login',
    },
  ];

  loginMenu = [
    {
      name: 'Início',
      icon: 'fa-home',
      path: '/home',
    },
    {
      name: 'Criar Usuário',
      icon: 'fa-user-plus',
      path: '/create-user',
    },
    {
      name: 'Login',
      icon: 'fa-sign-in',
      path: '/login',
    },
  ];

  logoutMenu = [
    {
      name: 'Home',
      icon: 'fa-home',
      path: '/home',
    },
    {
      name: 'Profile',
      icon: 'fa-user',
      path: '/profile',
    },
    {
      name: 'Logout',
      icon: 'fa-sign-out',
      path: '/logout',
    },
  ];

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
        this.menuItems = this.logoutMenu;
      } else {
        this.menuItems = this.loginMenu;
      }
    });
  }

  router(path: string) {
    if (path !== '/logout') {
      this._router.navigate([path]);
    } else {
      this.logout();
    }
  }
}
