import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide_pass = true;
  signInForm = new FormGroup({
    email: new FormControl('', Validators.email), // Email validation
    password: new FormControl('', [Validators.maxLength(8) ,Validators.pattern(/[*$@!#%&()^~{}]+/)]), // Password validation
  });

  constructor() { }

  ngOnInit(): void {
  }

}
