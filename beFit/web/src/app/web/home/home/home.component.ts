import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export interface Tile {
  imagesrc: string;
  cols: number;
  rows: number;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tiles: Tile[] = [
    {
      cols: 3,
      rows: 1,
      imagesrc: 'assets/ab_images/fitness.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 2,
      rows: 1,
      imagesrc: 'assets/ab_images/golf.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 1,
      rows: 1,
      imagesrc: 'assets/ab_images/paintball.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 3,
      rows: 2,
      imagesrc: 'assets/ab_images/biliard.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 1,
      rows: 1,
      imagesrc: 'assets/ab_images/ciclism.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 2,
      rows: 1,
      imagesrc: 'assets/ab_images/darts.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 3,
      rows: 1,
      imagesrc: 'assets/ab_images/aerobic.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 2,
      rows: 1,
      imagesrc: 'assets/ab_images/dans.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 1,
      rows: 1,
      imagesrc: 'assets/ab_images/curling.jpg',
      color: 'whitesmoke',
    },
  ];
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    if (this.authenticationService.userValue)
      if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);
  }

  ngOnInit(): void {

  }

}
