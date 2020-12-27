import { AbonamentLiteModel } from './../../../services/models/abonament/abonament.lite.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { AbonamentService } from 'src/app/services/abonament/abonament.service';

export interface Abonament {
  id: number;
  title: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AbonamentService]
})
export class AdminComponent implements OnInit {

  public formGroup!: FormGroup;
  public abonamente!: AbonamentLiteModel[];
  public abonamenteCopy!: AbonamentLiteModel[];
  public isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly formBuilder: FormBuilder,
    private readonly abonamentService: AbonamentService,
  ) {

    this.formGroup = this.formBuilder.group({
      searchInput: new FormControl('')
    });

    this.getAllAbs();
  }

  public getAllAbs() {
    this.isLoading = true;
    this.abonamentService.getAll().subscribe(response => {
      this.abonamente = response;
      this.abonamenteCopy = this.abonamente;
      this.isLoading = false;
    });
  }

  public changeActive(activeVal: boolean, id: number) {
    this.abonamentService.changeActive(activeVal, id).subscribe(() => {
      this.abonamente.forEach((ab, index) => {
        if (ab.id == id) this.abonamente[index].active = activeVal;});
      this.abonamenteCopy.forEach((ab, index) => {
        if (ab.id == id) this.abonamenteCopy[index].active = activeVal;});
    });

  }

  public updateAbonamenteWhenSearch(event: Event) {
    let { searchInput } = this.formGroup.getRawValue();
    if (searchInput != '') {
      this.abonamenteCopy = [];
      this.abonamente.forEach((item) => {
        if (item.title.includes(searchInput)) this.abonamenteCopy.push(item);
      });
    }
    else this.abonamenteCopy = this.abonamente;
  }

  public openDialogDeactivate(title: string, id: number) {
    this.confirmationDialogService.confirm('', `Dezactivezi abonamentul: ${title}?`)
      .then((confirmed) => { if (confirmed) this.changeActive(false, id); })
      .catch(() => {
      });
  }

  public openDialogActivate(title: string, id: number) {
    this.confirmationDialogService.confirm('', `Activezi abonamentul: ${title}?`)
      .then((confirmed) => { if (confirmed) this.changeActive(true, id); })
      .catch(() => {
      });
  }

  ngOnInit(): void {
  }

}
