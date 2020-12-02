import { UserUpdateModel } from './../../../services/models/user/user.update.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import * as data from '../../../../assets/static.data.json';

@Component({
  selector: 'app-actualizare',
  templateUrl: './actualizare.component.html',
  styleUrls: ['./actualizare.component.css']
})
export class ActualizareComponent implements OnInit {

  formGroup: FormGroup;
  public isValid: boolean = true;

  constructor(private confirmationDialogService: ConfirmationDialogService,
    private readonly formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10),
      Validators.maxLength(10)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      new_password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
    // init fields
    this.formGroup.controls.lastname.setValue(data.user_dummy.lastname);
    this.formGroup.controls.firstname.setValue(data.user_dummy.firstname);
    this.formGroup.controls.email.setValue(data.user_dummy.email);
    this.formGroup.controls.phone.setValue(data.user_dummy.phone);
    this.formGroup.controls.password.setValue(data.user_dummy.password);
  }

  public updateProfil() {
    if (this.formGroup.valid) {
      this.isValid=true;
      const data: UserUpdateModel = this.formGroup.getRawValue();
      console.log(data);
    }
    else this.isValid=false;
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
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'new_password': {
        if (this.formGroup.controls.new_password.hasError('minlength'))
          return 'Câmpul trebuie să conţină minim 5 caractere.';
        if (this.formGroup.controls.new_password.hasError('required'))
          return 'Câmpul este obligatoriu.';
        return '';
      }
      case 'form':{
        return 'Câmpurile sunt completate necorespunzător';
      }
      default: {
        return '';
      }
    }
  }

  public openDialog() {
    this.confirmationDialogService.confirm('', 'Eşti sigur că vrei să salvezi modificările făcute?')
      .then((confirmed) => {
        console.log('Button:', confirmed);
        if (confirmed) {
          if(!this.formGroup.valid) {
            this.isValid = false;
          }
        }
      })
      .catch(() => {
        console.log('Dismiss');
      });
  }
  ngOnInit(): void {
  }

}
