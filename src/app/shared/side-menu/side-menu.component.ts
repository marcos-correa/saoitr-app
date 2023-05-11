import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  menuItems = [
    {
      name: 'Home',
      icon: 'fa-home',
      path: '/home',
    },
    {
      name: 'Create User',
      icon: 'fa-user-plus',
      path: '/create-user',
    },
    {
      name: 'Login',
      icon: 'fa-sign-in',
      path: '/login',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
