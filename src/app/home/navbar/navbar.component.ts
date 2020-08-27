import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInput, UserOutput } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() user: UserOutput;

  fullName: string = '';

  constructor(
    private _authSrv: AuthService
  ) { }

  ngOnInit(): void {
    if (!!this.user) {
      this.fullName = this.user.name + ' ' + this.user.lastname;
    }
  }

  logout() {
    this._authSrv.logout(this.user);
  }
}
