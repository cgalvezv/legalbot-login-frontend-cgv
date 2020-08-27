import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInput, UserOutput } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() user: UserOutput;// is the user logged

  fullName: string = '';// To declare full name of logged user
  loading: boolean = false// To hide/show loading bar

  constructor(
    private _authSrv: AuthService
  ) { }

  ngOnInit(): void {
    // Implement full name creation
    if (!!this.user) {
      this.fullName = this.user.name + ' ' + this.user.lastname;
    }
  }

  /**
   * Method to logout the session
   * @author cgalvezv
   */
  logout() {
    this.loading = true;
    setTimeout(() => {
      this._authSrv.logout(this.user);
    }, 2000);
  }
}
