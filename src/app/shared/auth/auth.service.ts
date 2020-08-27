import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserToSignIn, UserInput, UserOutput } from '../models/user.model';
import { SIGN_IN_ENDPOINT } from '../backend.constant';
import { ACCESS_TOKEN_TITLE, REFRESH_TOKEN_TITLE, USER_OBJECT_TITLE } from './auth.constant';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged$ = new BehaviorSubject<UserOutput>(null);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  getUserLogged$(): Observable<UserOutput> {
    return this.userLogged$.asObservable()
  }

  getUserLogged(): UserOutput {
    return this.userLogged$.getValue() || JSON.parse(atob(localStorage.getItem(USER_OBJECT_TITLE)));
  }

  setUserLogged(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    localStorage.setItem(USER_OBJECT_TITLE, user_serialized);
    this.userLogged$.next(user)
  }

  signIn(user: UserToSignIn): Observable<UserOutput> {
    return this._http.post<UserOutput>(SIGN_IN_ENDPOINT, user)
  }

  signUp(user: UserInput): Observable<UserOutput>  {
    return this._http.post<UserOutput>(SIGN_IN_ENDPOINT, user);
  }

  setAuthToken(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    localStorage.setItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized), user.accessToken);
    localStorage.setItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized), user.refreshToken);
  }
}
