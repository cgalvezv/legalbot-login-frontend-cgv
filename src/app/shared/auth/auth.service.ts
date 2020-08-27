import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserToSignIn, UserInput, UserOutput } from '../models/user.model';
import { SIGN_IN_ENDPOINT } from '../backend.constant';
import { ACCESS_TOKEN_TITLE, REFRESH_TOKEN_TITLE } from './auth.constant';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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
    return this.userLogged$.getValue()
  }

  setUserLogged(user: UserOutput) {
    this.userLogged$.next(user)
  }

  signIn(user: UserToSignIn): Observable<UserOutput> {
    return this._http.post<UserOutput>(SIGN_IN_ENDPOINT, user)
  }

  signUp(user: UserInput): Observable<UserOutput>  {
    return this._http.post<UserOutput>(SIGN_IN_ENDPOINT, user);
  }

  setAuthToken(user_id: string, accessToken: string, refresToken: string) {
    localStorage.setItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_id), accessToken);
    localStorage.setItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_id), refresToken);
  }
}
