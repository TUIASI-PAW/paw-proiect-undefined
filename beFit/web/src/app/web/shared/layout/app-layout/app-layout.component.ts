import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AppUser } from 'src/app/services/models/user/app.user';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent implements OnInit {

  public user: AppUser;
  public isLoggedIn: boolean = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {
  }

  logout(): void {
    this.isLoggedIn = false;
    this.authenticationService.logout();
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserData();
    this.isLoggedIn = this.user != null;
  }
}
