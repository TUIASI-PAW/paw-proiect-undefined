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
      imagesrc: 'assets/cardio.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 2,
      rows: 2,
      imagesrc: 'assets/running.jpg',
      color: 'whitesmoke',
    },
    {

      cols: 1,
      rows: 2,
      imagesrc: 'assets/pool.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 3,
      rows: 1,
      imagesrc: 'assets/fitness.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 1,
      rows: 1,
      imagesrc: 'assets/golf.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 2,
      rows: 1,
      imagesrc: 'assets/tennis.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 2,
      rows: 1,
      imagesrc: 'assets/spa.jpg',
      color: 'whitesmoke',
    },
    {
      cols: 1,
      rows: 1,
      imagesrc: 'assets/spa2.jpg',
      color: 'whitesmoke',
    },
  ];
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router:Router
    ) {
    if(this.authenticationService.getUserData().role=='ROLE_ADMIN')this.router.navigate(['admin']);
  }

  ngOnInit(): void {

  }

}
