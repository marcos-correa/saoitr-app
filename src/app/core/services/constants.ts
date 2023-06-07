import { environment } from 'src/environments/environment';

export const BASE_URL = () => environment['baseURL'];

export const MENU_ITEMS = [
  {
    name: 'Início',
    icon: 'home', // fa-home
    path: '/home',
  },
  {
    name: 'Criar Usuário',
    icon: 'user', // fa-user-plus
    path: '/create-user',
  },
  {
    name: 'Login',
    icon: 'sign-in',
    path: '/login',
  },
];

export const LOGIN_MENU = [
  {
    name: 'Início',
    icon: 'home',
    path: '/home',
  },
  {
    name: 'Criar Usuário',
    icon: 'user',
    path: '/create-user',
  },
  {
    name: 'Login',
    icon: 'sign-in',
    path: '/login',
  },
];

export const LOGOUT_MENU = [
  {
    name: 'Início',
    icon: 'home',
    path: '/home',
  },
  {
    name: 'Profile',
    icon: 'user',
    path: '/profile',
  },
  {
    name: 'Logout',
    icon: 'sign-out',
    path: '/logout',
  },
];
