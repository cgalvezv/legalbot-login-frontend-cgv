import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { UserOutput, UserInput } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userLogged: UserInput = null //To save the recently logged user
  constructor(
    private _authSrv: AuthService
  ) { }

  ngOnInit(): void {
    this.userLogged = this._authSrv.getUserLogged();
  }

}
