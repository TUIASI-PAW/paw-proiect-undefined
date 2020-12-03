import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

import { AbonamentModel } from '../../../services/models/abonament/abonament.model';

import * as data from '../../../../assets/static.data.json';

@Component({
  selector: 'app-detalii',
  templateUrl: './detalii.component.html',
  styleUrls: ['./detalii.component.css']
})
export class DetaliiComponent implements OnInit {

  public details: AbonamentModel;
  public redirectId: string;
  constructor(
    private router: Router,
  ) {
    this.redirectId = this.router.url.split('/').slice(-1)[0];
    this.details = data.detalii_abonament;
  }

  ngOnInit(): void {
  }

}