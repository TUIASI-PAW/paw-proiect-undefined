import { UserUpdateModel } from './../../../services/models/user/user.update.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-actualizare',
  templateUrl: './actualizare.component.html',
  styleUrls: ['./actualizare.component.css'],
  providers: [UserService]
})
export class ActualizareComponent implements OnInit {

  formGroup: FormGroup;
  public isValid: boolean = true;
  public apiMsg: String = null;
  public isWaitingForApiResponse = false;


  constructor(private confirmationDialogService: ConfirmationDialogService,
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly userService: UserService,

  ) {
    if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10),
                                                         Validators.maxLength(10)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl(null, [Validators.minLength(5)])
    });
    this.userService.get().subscribe(response=>{
      this.formGroup.controls.lastname.setValue(response.lastname);
      this.formGroup.controls.firstname.setValue(response.firstname);
      this.formGroup.controls.email.setValue(response.email);
      this.formGroup.controls.phone.setValue(response.phone);
    });

  }

  public updateProfil() {
    if(this.formGroup.controls['newPassword'].value=='')
      this.formGroup.controls.newPassword.setValue(null);
    if (this.formGroup.valid) {
      this.apiMsg=null;
      this.isValid = true;

      const data: UserUpdateModel = this.formGroup.getRawValue();
      this.isWaitingForApiResponse=true;

      this.userService.update(data)
        .subscribe({
          next: () => {
            this.isWaitingForApiResponse=false;
            this.authenticationService.logout();
          },
          error: err =>{
            this.isWaitingForApiResponse=false;
            if(err.status == 400 )
              this.apiMsg= "Parola introdusă este greşită.";
            else if(err.status == 409 )
              this.apiMsg="Email-ul introdus corespunde altui utilizator."
            else this.apiMsg= err.error.message;
          }
        })
    }
    else this.isValid = false;
  }

  getErrorMessage(formElement: String): String {
    switch (formElement) {
      case 'firstname': {
        if (this.formGroup.controls.firstname.hasError('minlength'))
          return 'Câmpul trebuie să conţină minim 3 caractere.';
        if (this.formGroup.controls.firstname.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'lastname': {
        if (this.formGroup.controls.lastname.hasError('minlength'))
          return 'Câmpul trebuie să conţină minim 3 caractere.';
        if (this.formGroup.controls.lastname.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'email': {
        if (this.formGroup.controls.email.hasError('email'))
          return 'Emailul introdus este invalid';
        if (this.formGroup.controls.email.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'phone': {
        if (this.formGroup.controls.phone.hasError('minlength'))
          return 'Câmpul trebuie să conţină 10 caractere';
        if (this.formGroup.controls.phone.hasError('maxlength'))
          return 'Câmpul trebuie să conţină 10 caractere';
        if (this.formGroup.controls.phone.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'password': {
        if (this.formGroup.controls.password.hasError('minlength'))
          return 'Câmpul trebuie să conţină minim 5 caractere.';
        if (this.formGroup.controls.password.hasError('required'))
          return 'Pentru a continua, trebuie să introduci parola contului.';
        return '';
      }
      case 'newPassword': {
        if (this.formGroup.controls.newPassword.hasError('minlength'))
          return 'Câmpul trebuie să conţină minim 5 caractere.';
        if (this.formGroup.controls.newPassword.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'form': {
        return 'Câmpurile sunt completate necorespunzător';
      }
      default: {
        return '';
      }
    }
  }

  public openDialog() {
    this.confirmationDialogService.confirm('', 'Executarea cu succes a acestei acţiuni te va deconecta, eşti sigur că vrei să continui?')
      .then((confirmed) => {
        if (confirmed)
          this.updateProfil();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  ngOnInit(): void {
  }

}
