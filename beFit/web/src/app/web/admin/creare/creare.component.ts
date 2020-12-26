import { AbonamentService } from 'src/app/services/abonament/abonament.service';
import { AbonamentCreateModel } from './../../../services/models/abonament/abonament.create.model';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model'
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';


@Component({
  selector: 'app-creare',
  templateUrl: './creare.component.html',
  styleUrls: ['./creare.component.css']
})
export class CreareComponent implements OnInit {
  public categorii!: CategorieModel[];

  public isValid: boolean = true;
  public url: any;
  public file: File;

  public formGroup!: FormGroup;

  public isWaitingForApiResponse = false;
  public apiMsg:string = null;


  constructor(
    private readonly router: Router,
    private readonly _ngZone: NgZone, private formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly abonamentService: AbonamentService
  ) {
    this.categoryService.getAll().subscribe(response => { this.categorii = response; })
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
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }


  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];

      reader.onload = (event) => {
        this.url = event.target?.result?.toString();
      }

    }
  }

  addAbonament(): void {
    if (this.formGroup.valid) {
      this.apiMsg=null;
      let submittedData: AbonamentCreateModel = this.formGroup.getRawValue();
      this.isWaitingForApiResponse = true;
      this.abonamentService.addAb(submittedData, this.file).subscribe({
        next: () => {
          this.isWaitingForApiResponse = false;
          this.router.navigate(['admin']);
        },
        error: err => {
          this.isWaitingForApiResponse = false;
          this.apiMsg = err.error.message;
        }
      });
    }
    else this.isValid = false;
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

  removeImage(): void {
    this.url = undefined;
  }

}
