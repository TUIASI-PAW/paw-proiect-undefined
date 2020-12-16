import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';
import * as data from '../../../../assets/static.data.json';
import { Router } from '@angular/router';

export interface Abonament {
  id: number;
  title: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public formGroup!: FormGroup;
  public abonamente!: Abonament[];

  constructor(
    private readonly router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder
  ) {

    this.formGroup = this.formBuilder.group({
      searchInput: new FormControl('')
    });
    this.abonamente = data.abonamente_admin;
  }

  public updateAbonamente(event: Event) {
    let { searchInput } = this.formGroup.getRawValue();

    if (searchInput != '') {
      this.abonamente = [];

      for (let i = 0; i < data.abonamente_admin.length; i++) {
        if (data.abonamente_admin[i].title == searchInput) {
          this.abonamente.push(data.abonamente_admin[i]);
        }
      }
    }
    else {
      this.abonamente = data.abonamente_admin;
    }
  }

  public openDialog(title: string, id: number) {
    this.confirmationDialogService.confirm('', `Ştergi abonamentul: ${title}?`)
      .then((confirmed) => {
        console.log('Button:', confirmed);
        if (confirmed) {
          for (let i = 0; i < this.abonamente.length; i++) {
            if (this.abonamente[i].id == id) {
              this.abonamente.splice(i, 1);
            }
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
