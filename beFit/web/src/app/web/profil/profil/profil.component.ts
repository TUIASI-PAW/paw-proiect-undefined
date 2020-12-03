import { Component, OnInit } from '@angular/core';

import {AbonamentListModel} from '../../../services/models/abonament/abonament.user.list.model';

import * as data from '../../../../assets/static.data.json';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  displayedColumns: string[] = ['title', 'valability'];
  
  dataSource: AbonamentListModel[];

  constructor() { 
    this.dataSource = data.abonamente_user;
  }

  ngOnInit(): void {
  }

}
