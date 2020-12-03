import { Component, OnInit } from '@angular/core';

import {AbonamentListModel} from '../../../services/models/abonament/abonament.user.list.model';
import {UserDetailsModel} from '../../../services/models/user/user.details.model';


import * as data from '../../../../assets/static.data.json';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'valability'];
  public dataSource: AbonamentListModel[];
  public userDetails: UserDetailsModel;
  constructor() { 
    this.dataSource = data.user_dummy.abonamente;
    this.userDetails = data.user_dummy;
  }

  ngOnInit(): void {
  }

}
