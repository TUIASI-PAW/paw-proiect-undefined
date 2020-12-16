import { Component, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/operators';

import * as data from "../../../../assets/static.data.json"

import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model'

import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import { Router } from '@angular/router';

interface Categorie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modificare',
  templateUrl: './modificare.component.html',
  styleUrls: ['./modificare.component.css']
})
export class ModificareComponent {
  public categorii!: CategorieModel[];

  public isValid: boolean = true;
  public url: any;

  public formGroup!: FormGroup;

  constructor(
    private readonly router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private _ngZone: NgZone,
    private formBuilder: FormBuilder) {
    // if (this.userService.getUserData().role != 'ROLE_ADMIN') {
    //   this.router.navigate(['abonamente']);
    // }
    // else {
    this.categorii = data.categorii;
    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      valability: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern(`^[0-9]+[0-9]*$`)]),
    });
    this.formGroup.controls['title'].setValue(data.detalii_abonament.title);
    this.formGroup.controls['category'].setValue(data.detalii_abonament.category);
    let date = new Date(data.detalii_abonament.expirationDate);
    this.formGroup.controls['expirationDate'].setValue(date);
    this.formGroup.controls['valability'].setValue(data.detalii_abonament.valability);
    this.formGroup.controls['description'].setValue(data.detalii_abonament.description);
    this.formGroup.controls['price'].setValue(data.detalii_abonament.price);
    // }
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result?.toString();
      }
    }
  }

  add(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.getRawValue());
    }
    else {
      this.isValid = false;
      console.log('false')
    }
  }

  getErrorMessage(formElement: String): String {
    switch (formElement) {
      case 'title': {
        if (this.formGroup.controls.title.hasError('required'))
          return 'Câmpul este obligatoriu';
        return 'Câmpul nu este valid.'
      }
      case 'category': {
        if (this.formGroup.controls.category.hasError('required'))
          return 'Câmpul este obligatoriu';
        return 'Câmpul nu este valid.'
      }
      case 'expirationDate': {
        if (this.formGroup.controls.expirationDate.hasError('required'))
          return 'Câmpul este obligatoriu';
        else return 'Data introdusă nu este validă.';
      }
      case 'valability': {
        if (this.formGroup.controls.valability.hasError('required'))
          return 'Câmpul este obligatoriu';
        return 'Câmpul nu este valid.'
      }
      case 'description': {
        if (this.formGroup.controls.description.hasError('required'))
          return 'Câmpul este obligatoriu';
        return 'Câmpul nu este valid.'
      }
      case 'price': {
        if (this.formGroup.controls.price.hasError('required'))
          return 'Câmpul este obligatoriu';
        return 'Câmpul nu este valid.'
      }
      case 'form': {
        return 'Câmpurile sunt completate necorespunzător';
      }
      default: {
        return ''
      }
    }
  }

  public openDialog() {
    this.confirmationDialogService.confirm('', `Eşti sigur că vrei să modifici acest abonament?`)
      .then((confirmed) => {
        console.log('Button:', confirmed);
        if (confirmed) {
          console.log(this.formGroup.getRawValue());
        }
      })
      .catch(() => {
        console.log('Dismiss');
      });
  }
  removeImage(): void {
    this.url = undefined;
  }
}
