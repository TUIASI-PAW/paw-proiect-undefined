import { AbonamentUserListModel } from './../../../services/models/abonament/abonament.user.list.model';
import { Component, OnInit } from '@angular/core';
import { UserDetailsModel } from '../../../services/models/user/user.details.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [UserService]
})
export class ProfilComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'valability'];
  public userDetails: UserDetailsModel;
  public isLoading= false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);

    this.isLoading=true;
    this.userService.get().subscribe(response=>{
      this.userDetails = response;
      this.isLoading=false;
    });
  }

  ngOnInit(): void {
  }

}
