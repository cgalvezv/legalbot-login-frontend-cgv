import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserToSignIn, UserInput, UserOutput } from '../models/user.model';
import { SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT } from '../backend.constant';
import { ACCESS_TOKEN_TITLE, REFRESH_TOKEN_TITLE, USER_OBJECT_TITLE } from './auth.constant';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLogged$ = new BehaviorSubject<UserOutput>(null); // Is the behavior of the logged user

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  /**
   * Return the observable of the user logged BH
   * @author cgalvezv
   */
  getUserLogged$(): Observable<UserOutput> {
    return this.userLogged$.asObservable()
  }

  /**
   * Return the value of the user logged from the BG or the local storage
   * @author cgalvezv
   */
  getUserLogged(): UserOutput {
    if (!!localStorage.getItem(USER_OBJECT_TITLE)) {
      return JSON.parse(atob(localStorage.getItem(USER_OBJECT_TITLE)));
    }
    return this.userLogged$.getValue();
  }

  /**
   * Set the BH and save in localstorage, the recently logged user
   * @param user is the user recently logged
   * @author cgalvezv
   */
  setUserLogged(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    localStorage.setItem(USER_OBJECT_TITLE, user_serialized);
    this.userLogged$.next(user)
  }

  /**
   * Return the observable, after to do the sign in action with the backend
   * @param user is the user to do the sign in action
   * @author cgalvezv
   */
  signIn(user: UserToSignIn): Observable<UserOutput> {
    return this._http.post<UserOutput>(SIGN_IN_ENDPOINT, user)
  }

  /**
   * Return the observable, after to do the sign up action with the backend
   * @param user is the user to do the sign up action
   * @author cgalvezv
   */
  signUp(user: UserInput): Observable<UserOutput>  {
    return this._http.post<UserOutput>(SIGN_UP_ENDPOINT, user);
  }

  /**
   * Method to do the logout action
   * @param user is the logged user
   * @author cgalvezv
   */
  logout(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    this._removeAllTokens(user_serialized);
    this._router.navigate(['/sign_in'])
  }

  /**
   * Return if the user is logged in into the page
   * @param user is the user who wants to knows is if logged in into the page or no
   * @author cgalvezv
   */
  isLoggedIn(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    return !!localStorage.getItem(USER_OBJECT_TITLE) &&
          !!localStorage.getItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized)) &&
          !!localStorage.getItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized));
  }

  /**
   * Save the user token into the local storage
   * @param user is the user object where we get the tokens
   * @author cgalvezv
   */
  setAuthToken(user: UserOutput) {
    const user_serialized = btoa(JSON.stringify(user));
    // If the user is logged in, remove that tokens
    if (this.isLoggedIn(user)) {
      this._removeAllTokens(user_serialized)
    }
    localStorage.setItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized), user.accessToken);
    localStorage.setItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized), user.refreshToken);
  }

  /**
   * Remove the token items into the local storage
   * @param user_serialized key to get the local storage item to remove
   * @author cgalvezv
   */
  private _removeAllTokens(user_serialized: string) {
    localStorage.removeItem(USER_OBJECT_TITLE);
    localStorage.removeItem(ACCESS_TOKEN_TITLE.replace('{user_id}', user_serialized));
    localStorage.removeItem(REFRESH_TOKEN_TITLE.replace('{user_id}', user_serialized));
  }
}
