import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AbonamentListModel } from '../../../services/models/abonament/abonament.list.model';
import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model';

import * as data from '../../../../assets/static.data.json';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';



@Component({
  selector: 'app-abonamente',
  templateUrl: './abonamente.component.html',
  styleUrls: ['./abonamente.component.css']
})
export class AbonamenteComponent implements OnInit {

  public list: AbonamentListModel[] = [];
  public categorii: CategorieModel[];

  public pageEvent!: PageEvent;
  public length: number = data.lista_abonamente.length;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [5, 10, 15, 25];


  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);

    for (let i = this.pageSize * (this.pageIndex); i < this.pageSize; i++) {
      if (i == data.lista_abonamente.length - 1)
        break;
      this.list.push(data.lista_abonamente[i]);
    }

    this.categorii = data.categorii;
  }
  public update(event: PageEvent): PageEvent {
    this.list = [];
    let start = event.pageSize * (event.pageIndex);

    for (let i = start; i < event.pageSize + start; i++) {
      if (i == data.lista_abonamente.length)
        break;
      this.list.push(data.lista_abonamente[i]);
    }

    return event;
  }

  ngOnInit(): void {
  }

}
