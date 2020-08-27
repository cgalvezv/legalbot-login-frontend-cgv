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

  constructor() { }

  ngOnInit(): void {
  }

}
