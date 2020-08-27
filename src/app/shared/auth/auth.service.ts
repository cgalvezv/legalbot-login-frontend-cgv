import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserToSignIn, UserInput, UserOutput } from '../models/user.model';
import { SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT } from '../backend.constant';
import { ACCESS_TOKEN_TITLE, REFRESH_TOKEN_TITLE, USER_OBJECT_TITLE } from './auth.constant';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLogged$ = new BehaviorSubject<UserOutput>(null);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  getUserLogged$(): Observable<UserOutput> {
    return this.userLogged$.asObservable()
  }

  getUserLogged(): UserOutput {
    if (!!localStorage.getItem(USER_OBJECT_TITLE)) {
      return JSON.parse(atob(localStorage.getItem(USER_OBJECT_TITLE)));
    }
    return this.userLogged$.getValue();
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
    return this._http.post<UserOutput>(SIGN_UP_ENDPOINT, user);
  }

  logout(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    this._removeAllTokens(user_serialized);
    this._router.navigate(['/sign_in'])
  }

  isLoggedIn(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    return !!localStorage.getItem(USER_OBJECT_TITLE) &&
          !!localStorage.getItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized)) &&
          !!localStorage.getItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized));
  }

  setAuthToken(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    if (this.isLoggedIn(user)) {
      this._removeAllTokens(user_serialized)
    }
    localStorage.setItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized), user.accessToken);
    localStorage.setItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized), user.refreshToken);
  }

  private _removeAllTokens(user_serialized: string) {
    localStorage.removeItem(USER_OBJECT_TITLE);
    localStorage.removeItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized));
    localStorage.removeItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized));
  }
}
