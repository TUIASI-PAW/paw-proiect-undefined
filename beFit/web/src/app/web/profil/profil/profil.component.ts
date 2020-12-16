import { Component, OnInit } from '@angular/core';

import {AbonamentListModel} from '../../../services/models/abonament/abonament.user.list.model';
import {UserDetailsModel} from '../../../services/models/user/user.details.model';


import * as data from '../../../../assets/static.data.json';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'valability'];
  public dataSource: AbonamentListModel[];
  public userDetails: UserDetailsModel;
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router:Router
    ) {
    if(this.authenticationService.getUserData().role=='ROLE_ADMIN')this.router.navigate(['admin']);
    this.dataSource = data.user_dummy.abonamente;
    this.userDetails = data.user_dummy;
  }

  ngOnInit(): void {
  }

}
