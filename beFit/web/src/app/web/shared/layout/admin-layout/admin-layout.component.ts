import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AppUser } from 'src/app/services/models/user/app.user';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  public user: AppUser;
  public isLoggedIn: boolean = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
      this.isLoggedIn = this.user && this.user.token != null;
    });
  }


  logout(): void {
    this.authenticationService.logout();
  }
  ngOnInit(): void {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
      this.isLoggedIn = this.user && this.user.token != null;
    });
  }
}
