import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/users`);
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/login`, user);
  }

  createUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/users`, user);
  }

  get BASE_URL() {
    return environment['baseURL'];
  }
}
