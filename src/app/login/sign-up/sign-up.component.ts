import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide_pass = true;
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]), // Name validation
    lastname: new FormControl(''), // Lastname field
    gender: new FormControl('', Validators.required), // Gender validation
    email: new FormControl('', [Validators.required, Validators.email]), // Email validation
    password: new FormControl('', [Validators.required, Validators.maxLength(8) ,Validators.pattern(/[*$@!#%&()^~{}]+/)]), // Password validation
  });

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

  constructor() { }

  ngOnInit(): void {
  }

}
