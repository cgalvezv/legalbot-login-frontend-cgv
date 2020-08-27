import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authSrv: AuthService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    if (!this._authSrv.isLoggedIn(this._authSrv.getUserLogged())) {
      this._router.navigate(['/sign_in'])
      return false;
    }
    return true;
  }
}
