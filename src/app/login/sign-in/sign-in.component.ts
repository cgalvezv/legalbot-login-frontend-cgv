import { Component, OnInit, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators';
import { AuthService } from '../../shared/auth/auth.service';
import { UserOutput } from 'src/app/shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loading = false; // To hide/show loading bar
  hide_pass = true; // To hide/show password behavior
  show_signin_error_card = false; // To hide/show sign in error
  // Sign In form declaration
  signInForm = new FormGroup({
    email: new FormControl('', Validators.email), // Email validation
    password: new FormControl(''), // Password validation
  });

  // Validation messages into the view
  validationMessages = {
    email: {
      error: 'Invalid email format'
    },
    session: {
      error: 'Invalid email or password, try again'
    }
  }

  constructor(
    private _authSrv: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Clean the wrong login action message
    this.signInForm.valueChanges
      .subscribe(() => this.show_signin_error_card = false);
  }
  /**
   * Method to generate the sign in action
   * @author cgalvezv
   */
  submit() {
    this.loading = true;
    this._authSrv.signIn(this.signInForm.value)
      .pipe(
        delay(1000)
      )
      .subscribe((response: any) => {
        if (response) {
          this.loading = false;
          if (response.msg) {
            this._openSnackBar(response.msg);
          }
          if (response.user) {
            this._authSrv.setAuthToken(response.user);
            this._authSrv.setUserLogged(response.user);
            this._router.navigate(['/home'])
          }
        }
      },
      err => {
        this.loading = false;
        if (err && (err.status === 401 || err.status === 404)) {
          this.show_signin_error_card = true;
        } else {
          const msg = 'There are currently connection errors, please wait a moment or contact the author of the app';
          this._openSnackBar(msg);
        }
      });
  }

  /**
   * Method to show a snack bar into the page
   * @param message is the message into the snack bar
   * @author cgalvezv
   */
  private _openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
