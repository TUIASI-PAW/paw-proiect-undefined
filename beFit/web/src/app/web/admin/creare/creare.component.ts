import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/operators';

import * as data from "../../../../assets/static.data.json"

import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model'


@Component({
  selector: 'app-creare',
  templateUrl: './creare.component.html',
  styleUrls: ['./creare.component.css']
})
export class CreareComponent implements OnInit {
  public categorii: CategorieModel[];

  public isValid: boolean = true;
  public url: any;

  public formGroup: FormGroup;

  constructor(private _ngZone: NgZone, private formBuilder: FormBuilder) {
    this.categorii = data.categorii;
    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      valability: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern(`^[0-9]+[0-9]*$`)]),
    });
  }


  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
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
    console.log("adsa");
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
  removeImage():void{
    this.url = undefined;
  }
}
