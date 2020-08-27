import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserToSignIn, UserInput, UserOutput } from '../models/user.model';
import { SIGN_IN_ENDPOINT } from '../backend.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  signIn(user: UserToSignIn) {
    this._http.post(SIGN_IN_ENDPOINT, user)
      .subscribe((response: UserOutput) => {
        console.log(response)
      }, err => {
        console.log(err)
      });
  }

  signUp(user: UserInput) {
    this._http.post(SIGN_IN_ENDPOINT, user)
      .subscribe((response: AuthService) => {
        console.log(response)
      }, err => {
        console.log(err)
      });
  }
}
