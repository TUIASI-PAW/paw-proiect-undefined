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
      this.isLoading = false;
    });
  }

  public deleteAbonament(id: number) {
    this.abonamentService.deleteAb(id).subscribe(() => {
      this.abonamente.forEach((ab, index) => {
        if (ab.id == id) {
          this.abonamente.splice(index, 1);
        }
      });
    });
  }

  public updateAbonamenteWhenSearch(event: Event) {
    let { searchInput } = this.formGroup.getRawValue();

    if (searchInput != '') {
      this.abonamenteCopy = [];

      for (let i = 0; i < this.abonamente.length; i++) {
        if (this.abonamente[i].title == searchInput) {
          this.abonamenteCopy.push(this.abonamente[i]);
        }
      }
    }
    else {
      this.abonamenteCopy = this.abonamente;
    }
  }

  public openDialog(title: string, id: number) {
    this.confirmationDialogService.confirm('', `Ştergi abonamentul: ${title}?`)
      .then((confirmed) => {
        console.log('Button:', confirmed);
        if (confirmed) {
          this.deleteAbonament(id);
        }
      })
      .catch(() => {
        console.log('Dismiss');
      });
  }

  ngOnInit(): void {
  }

}
