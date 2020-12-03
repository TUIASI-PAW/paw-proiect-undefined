import { Component, OnInit, } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
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

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
  ) {

    const reqId= this.router.url.split('/').slice(-1)[0];
    console.log(reqId);
    this.details = data.detalii_abonament;

  }

  public openDialog() {
    this.confirmationDialogService.confirm('', `Activezi "${this.details.title}" ?`)
      .then((confirmed) => {
        if (confirmed) {
          console.log('Se cumpără!!!');
        }
        else {
          console.log('No tengo dinero, baws! :(');
        }
      })
      .catch(() => {
        console.log('Am apasat din greseala!');
      });
  }

  ngOnInit(): void {
  }

}
