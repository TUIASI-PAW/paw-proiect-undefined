import { Component, OnInit, } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import { Router } from '@angular/router';

import { AbonamentModel } from '../../../services/models/abonament/abonament.model';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AbonamentService } from 'src/app/services/abonament/abonament.service';

@Component({
  selector: 'app-detalii',
  templateUrl: './detalii.component.html',
  styleUrls: ['./detalii.component.css'],
  providers: [AuthenticationService, AbonamentService]
})
export class DetaliiComponent implements OnInit {

  public details: AbonamentModel;
  public isLoading=false;
  
  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private readonly authenticationService: AuthenticationService,
    private readonly abonamentService:AbonamentService,
    private readonly router: Router,
  ) {
    if (this.authenticationService.userValue)
      if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);

    const id = this.router.url.split('/').slice(-1)[0];
    this.isLoading=true;
    this.abonamentService.get(id).subscribe(response=>{
      console.log(response);
      this.details=response;
      this.isLoading=false;
    })

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
