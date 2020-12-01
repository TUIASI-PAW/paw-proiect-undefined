import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';

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
  abonamente: Abonament[] = [
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
  ];
  constructor(private confirmationDialogService: ConfirmationDialogService) { }

  public openDialog(title:String) {
    this.confirmationDialogService.confirm('', `Ştergi abonamentul: ${title}?`)
      .then((confirmed) => {
        console.log('Button:', confirmed);
      })
      .catch(() => {
        console.log('Dismiss');
      });
  }
  ngOnInit(): void {
  }

}
