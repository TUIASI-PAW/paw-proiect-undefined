import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserAuthModel } from '../../../../services/models/user/user.auth.model';

@Component({
  selector: 'app-autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.css'],
  providers: [AuthenticationService]
})
export class AutentificareComponent implements OnInit {

  public formGroup: FormGroup;
  public isValid: boolean = true;

  public isWaitingForApiResponse = false;
  public apiMsg:string = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) this.router.navigate(['/']);
    this.formGroup = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
  }
  signin(): void {
    this.apiMsg=null;
    if (this.formGroup.invalid) return;

    const user: UserAuthModel = this.formGroup.getRawValue();
    this.isWaitingForApiResponse=true;
    this.authenticationService.signin(user)
      .pipe(first())
      .subscribe({
        next: () => {
          if (this.authenticationService.getUserData().role == 'ROLE_ADMIN'){
            this.router.navigate(['admin']);
          }
          else {
            this.isWaitingForApiResponse=false;
            const url = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(url);
          }
        },
        error: err => {
          this.isWaitingForApiResponse=false;
          if(err.error.message == 'Bad credentials')
            this.apiMsg='Email-ul sau parola sunt greşite.'
          else this.apiMsg=err.error.message;
        }
      })

  }
  getErrorMessage(formElement: String): String {
    switch (formElement) {
      case 'email': {
        if (this.formGroup.controls.email.hasError('email'))
          return 'Emailul introdus este invalid';
        if (this.formGroup.controls.email.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'password': {
        if (this.formGroup.controls.password.hasError('minlength'))
          return 'Câmpul trebuie să conţină minim 5 caractere.';
        if (this.formGroup.controls.password.hasError('required'))
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

}
