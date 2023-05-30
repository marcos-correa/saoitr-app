import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { USER_MESSAGES } from '../constants/messages';

import { Md5 } from 'ts-md5';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSub: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.getUserFromStorage()
  );
  user$ = this.userSub.asObservable();

  isUserLoggedInSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('token') ? true : false
  );
  isUserLogged$ = this.isUserLoggedInSub.asObservable();

  constructor(
    private httpClient: HttpClient,
    private _router: Router,
    private _messageService: MessageService,
    private _md5: Md5
  ) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/users`);
  }

  getUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  login(user: any): Observable<any> {
    // encrypting password as md5 hash
    const userMd5 = this._encryptPassword(user);
    return this.httpClient.post(`${this.BASE_URL}/login`, userMd5).pipe(
      tap((res: any) => {
        this._setUser(res);
      })
    );
  }

  logout() {
    const { id } = this.getUserFromStorage();
    this.httpClient.post(`${this.BASE_URL}/logout`, { id }).subscribe({
      next: () => {
        this._resetUser();
        this._messageService.add(USER_MESSAGES.LOGOUT_SUCCESS);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _setUser(user: any) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSub.next(user);
    this.isUserLoggedInSub.next(true);
  }

  private _resetUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSub.next(null);
    this.isUserLoggedInSub.next(false);
    this._router.navigate(['/']);
  }

  createUser(user: any): Observable<any> {
    // encrypting password as md5 hash
    const userMd5 = this._encryptPassword(user);
    return this.httpClient.post(`${this.BASE_URL}/users`, userMd5);
  }

  private _encryptPassword(user: any) {
    const password = Md5.hashStr(user.password);
    return {
      ...user,
      password,
    };
  }

  testHash() {
    const password = Md5.hashStr('1234aa56');
    console.log('PASS:', password);
  }

  get BASE_URL() {
    return environment['baseURL'];
  }
}
