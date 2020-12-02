import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';

export interface Abonament {
  id: number;
  title: string;
}

let abonamente = [
  {
    title: "Abonament_1",
    id: 1
  },
  {
    title: "Abonament_2",
    id: 2
  },
  {
    title: "Abonament_3",
    id: 3
  },
  {
    title: "Abonament_4",
    id: 4
  },
  {
    title: "Abonament_5",
    id: 5
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formGroup: FormGroup;
  abonamente: Abonament[];

  constructor(private confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchInput: new FormControl('')
    });
    this.abonamente = abonamente;
  }

  public updateAbonamente(event: Event) {
    let { searchInput } = this.formGroup.getRawValue();

    if (searchInput != '') {
      this.abonamente = [];

      for (let i = 0; i < abonamente.length; i++) {
        if (abonamente[i].title == searchInput) {
          this.abonamente.push(abonamente[i]);
        }
      }
    }
    else {
      this.abonamente = abonamente;
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
