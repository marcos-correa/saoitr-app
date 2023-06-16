import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { USER_MESSAGES } from '../constants/messages';

import { Md5 } from 'ts-md5';
import { BASE_URL } from './constants';
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
    return this.httpClient.get(`${BASE_URL()}/users`);
  }

  getUserById(id: string) {
    this.httpClient
      .get(`${BASE_URL()}/users/${id}`)
      .pipe(
        tap((res: any) => {
          this._updateUserStorage(res);
        })
      )
      .subscribe({
        next: (user) => {
          this._messageService.add(USER_MESSAGES.USER_FOUND);
        },
        error: (error) => {
          this._messageService.add(USER_MESSAGES.USER_NOT_FOUND);
        },
      });
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
    return this.httpClient.post(`${BASE_URL()}/login`, userMd5).pipe(
      tap((res: any) => {
        this._setUser(res);
      })
    );
  }

  logout() {
    const { id } = this.getUserFromStorage();

    this.httpClient.post(`${BASE_URL()}/logout`, { id }).subscribe({
      next: () => {
        this._messageService.add(USER_MESSAGES.LOGOUT_SUCCESS);
      },
      error: () => {
        this._messageService.add(USER_MESSAGES.LOGOUT_ERROR);
        this.resetUser();
      },
      complete: () => {
        this.resetUser();
      },
    });
  }

  private _setUser(user: any) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSub.next(user);
    this.isUserLoggedInSub.next(true);
  }

  private _updateUserStorage(user: any) {
    const userStored = this.getUserFromStorage();
    const userToStore = {
      ...userStored,
      ...user,
    };
    localStorage.setItem('user', JSON.stringify(userToStore));
    this.userSub.next(userToStore);
  }

  resetUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSub.next(null);
    this.isUserLoggedInSub.next(false);
    this._router.navigate(['/']);
  }

  createUser(user: any): Observable<any> {
    // encrypting password as md5 hash
    const userMd5 = this._encryptPassword(user);
    return this.httpClient.post(`${BASE_URL()}/users`, userMd5);
  }

  private _encryptPassword(user: any) {
    const password = Md5.hashStr(user.password);
    return {
      ...user,
      password,
    };
  }

  updateUser(user: any, userId: number): Observable<any> {
    const userMd5 = this._encryptPassword(user);

    return this.httpClient.put(`${BASE_URL()}/users/${userId}`, userMd5).pipe(
      tap((res: any) => {
        this._updateUserStorage(res);
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${BASE_URL()}/users/${userId}`);
  }
}
