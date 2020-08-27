import { Component, OnInit, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { UserOutput } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide_pass = true; // To hide/show password behavior
  show_signin_error_card = false; // To hide/show sign in error
  // Sign In form declaration
  signInForm = new FormGroup({
    email: new FormControl('', Validators.email), // Email validation
    password: new FormControl(''), // Password validation
  });

  constructor(
    private _authSrv: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm.valueChanges
      .subscribe(() => this.show_signin_error_card = false);
  }

  submit() {
    this._authSrv.signIn(this.signInForm.value)
      .subscribe((user: UserOutput) => {
        if (user) {
          this._authSrv.setAuthToken(btoa(JSON.stringify(user)), user.accessToken, user.refreshToken);
          this._authSrv.setUserLogged(user);
          this._router.navigate(['home'])
        }
      },
      err => {
        if (err && (err.status === 401 || err.status === 404)) {
          this.show_signin_error_card = true;
        }
      });
  }

}
