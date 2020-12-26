import { Component, OnInit, } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import { Router } from '@angular/router';

import { AbonamentModel } from '../../../services/models/abonament/abonament.model';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AbonamentService } from 'src/app/services/abonament/abonament.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-detalii',
  templateUrl: './detalii.component.html',
  styleUrls: ['./detalii.component.css'],
  providers: [AuthenticationService, AbonamentService,UserService]
})
export class DetaliiComponent implements OnInit {

  public details: AbonamentModel;
  public isLoading=false;
  public isAuth = false;

  private id:string;
  

  constructor(
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly authenticationService: AuthenticationService,
    private readonly abonamentService:AbonamentService,
    private readonly userService:UserService,
    private readonly router: Router,
  ) {
    if (this.authenticationService.userValue)
      if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);

    this.isAuth = this.authenticationService.getUserData() != null;
    this.id = this.router.url.split('/').slice(-1)[0];
    this.isLoading=true;
    this.abonamentService.get(this.id).subscribe(response=>{
      this.details=response;
      this.details.image = "data:image/jpeg;base64," + this.details.image;
      this.isLoading=false;
    })

  }

  public openDialog() {
    this.confirmationDialogService.confirm('', `Activezi "${this.details.title}" ?`)
      .then((confirmed) => {
        if (confirmed) {
          this.userService.buy(this.id).subscribe({
            next: ()=>{
                alert('Felicitări, ai activat acest abonament!');
            },
            error: err=>{alert(err.error.message);}
          });
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
