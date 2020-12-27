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
import { AbonamentCreateModel } from 'src/app/services/models/abonament/abonament.create.model';


@Component({
  selector: 'app-modificare',
  templateUrl: './modificare.component.html',
  styleUrls: ['./modificare.component.css'],
  providers: [AbonamentService, CategoryService]
})
export class ModificareComponent {

  public categorii!: CategorieModel[];

  public isValid: boolean = true;
  public isLoading = false;

  public url: any;
  private tempUrl:any;
  public file: File = null;
  public isFileUpload=false;

  public formGroup!: FormGroup;
  public matSelectCategory: string;

  public isWaitingForApiResponse = false;
  public apiMsg: string = null;

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

      this.abonamentService.getById(routeIdNumber).subscribe(result => {
        let abonamentModel: AbonamentModel = result;
        this.formGroup.controls['title'].setValue(abonamentModel.title);
        this.formGroup.controls['category'].setValue(abonamentModel.category);
        let date = new Date(abonamentModel.expirationDate);
        this.formGroup.controls['expirationDate'].setValue(date);
        this.formGroup.controls['valability'].setValue(abonamentModel.valability);
        this.formGroup.controls['description'].setValue(abonamentModel.description);
        this.formGroup.controls['price'].setValue(abonamentModel.price);
        let { image } = result;
        this.url = "data:image/jpeg;base64," + image;
        this.tempUrl=this.url;
        this.isLoading = false;
      })
    });
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.isFileUpload=true;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];

      reader.onload = (event) => {
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
        if (confirmed) {
          this.apiMsg=null;
          let routeIdString = this.router.url.split('/')[3];
          let routeIdNumber: number = +routeIdString;

          let data: AbonamentCreateModel = this.formGroup.getRawValue();

          this.isWaitingForApiResponse = true;
          this.abonamentService.updateAb(routeIdNumber, data, this.file).subscribe({
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
      })
      .catch((err) => {});
  }

  removeImage(): void {
    this.url = null;
    this.file = null;
  }

  reinitializeImage():void{
    this.url=this.tempUrl;
    this.isFileUpload=false;
    this.file=null;
  }

  ngOnInit() {

  }

}
