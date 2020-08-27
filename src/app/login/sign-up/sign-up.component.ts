import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { delay } from 'rxjs/internal/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  loading = false; // To hide/show loading bar
  hide_pass = true; // To hide/show password behavior
  // Sign Up form declaration
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]), // Name validation
    lastname: new FormControl(''), // Lastname field
    gender: new FormControl('', Validators.required), // Gender validation
    email: new FormControl('', [Validators.required, Validators.email]), // Email validation
    password: new FormControl('', [Validators.required, Validators.maxLength(8) ,Validators.pattern(/[*$@!#%&()^~{}]+/)]), // Password validation
  });

  // Validation messages into the view
  validationMessages = {
    global: {
      required: 'Required',
    },
    name: {
      hint: 'At least 3 characters long',
      errors: {
        minLength: 'Wrong password length (Min length: 3)'
      }
    },
    email: {
      hint: 'Should be a valid email',
      errors: {
        email: 'Invalid email format'
      }
    },
    password: {
      hint: 'Should contain at least one special character (ie: *$@!#%&()^~{}) and be at least 8 characters long',
      errors: {
        pattern: 'Invalid format, password must contain least one special character (*$@!#%&()^~{})',
        maxLength: 'Wrong password length (Max length: 8)'
      }
    }
  }

  constructor(
    private _authSrv: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }
  /**
   * Method to generate the sign up action
   * @author cgalvezv
   */
  submit() {
    this.loading = true;
    this._authSrv.signUp(this.signUpForm.value)
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
        this._openSnackBar(err.error.msg);
      })
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
