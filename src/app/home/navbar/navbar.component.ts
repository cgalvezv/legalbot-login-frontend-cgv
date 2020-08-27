import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInput } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() user: UserInput;

  fullName: string = '';

  constructor() { }

  ngOnInit(): void {
    if (!!this.user) {
      this.fullName = this.user.name + ' ' + this.user.lastname;
    }
  }
}
