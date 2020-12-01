import { Component } from '@angular/core';
import { UserRegisterModel } from '../../../../services/models/user/user.register.model';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-inregistrare',
  templateUrl: './inregistrare.component.html',
  styleUrls: ['./inregistrare.component.css']
})
export class InregistrareComponent {

  public formGroup: FormGroup;
  public isValid: boolean =true;

  constructor(
    private readonly formBuilder: FormBuilder,) {
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }
  public register() {
    if (this.formGroup.valid) {
      this.isValid=true;
      const data: UserRegisterModel = this.formGroup.getRawValue();
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
      case 'form':{
        return 'Câmpurile sunt completate necorespunzător';
      }
      default: {
        return '';
      }
    }
  }
}
