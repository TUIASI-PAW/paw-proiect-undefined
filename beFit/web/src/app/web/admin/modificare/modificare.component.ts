import { AbonamentUpdateModel } from './../../../services/models/abonament/abonament.update.model';
import { AbonamentModel } from './../../../services/models/abonament/abonament.model';
import { Component, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model'
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { AbonamentService } from 'src/app/services/abonament/abonament.service';
import { CategoryService } from 'src/app/services/category/category.service';


@Component({
  selector: 'app-modificare',
  templateUrl: './modificare.component.html',
  styleUrls: ['./modificare.component.css'],
  providers: [AbonamentService, CategoryService]
})
export class ModificareComponent {
  public categorii!: CategorieModel[];
  public abonamentModel!: AbonamentModel;
  public abonamentUpdateModel!: AbonamentUpdateModel;
  public isValid: boolean = true;
  public url: any;
  public formGroup!: FormGroup;
  public matSelectCategory: string;
  public isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly _ngZone: NgZone,
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly abonamentService: AbonamentService) {

    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      valability: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern(`^[0-9]+[0-9]*$`)]),
    });

    let routeIdString = this.router.url.split('/')[3];
    let routeIdNumber: number = +routeIdString;

    this.isLoading = true;
    this.categoryService.getAll().subscribe(response => {
      this.categorii = response;

      // get current ab from db using service getByID(id from route)
      this.abonamentService.getById(routeIdNumber).subscribe(result => {
        this.abonamentModel = result;

        // filling form data with current ab details
        this.formGroup.controls['title'].setValue(this.abonamentModel.title);
        this.formGroup.controls['category'].setValue(this.abonamentModel.category);
        let date = new Date(this.abonamentModel.expirationDate);
        this.formGroup.controls['expirationDate'].setValue(date);
        this.formGroup.controls['valability'].setValue(this.abonamentModel.valability);
        this.formGroup.controls['description'].setValue(this.abonamentModel.description);
        this.formGroup.controls['price'].setValue(this.abonamentModel.price);

        this.isLoading = false;
      })
    });
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
          
          let routeIdString = this.router.url.split('/')[3];
          let routeIdNumber: number = +routeIdString;

          this.abonamentUpdateModel = this.formGroup.getRawValue();

          this.abonamentService.updateAb(routeIdNumber, this.abonamentUpdateModel).subscribe({
            next: () => {
              alert('Abonamentul a fost modificat cu succes!');
              this.router.navigate(['admin']);
            },
            error: err => {
              alert(err.error.message);
            }
          });
        }
      })
      .catch(() => {
        console.log('Dismiss');
      });
  }

  removeImage(): void {
    this.url = undefined;
  }

  ngOnInit() {

  }

}
