import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-alimentare',
  templateUrl: './alimentare.component.html',
  styleUrls: ['./alimentare.component.css']
})
export class AlimentareComponent implements OnInit {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);
  }

  ngOnInit(): void {
  }

}
