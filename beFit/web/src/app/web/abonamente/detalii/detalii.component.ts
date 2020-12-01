import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../shared/components/dialog/dialog.service';

@Component({
  selector: 'app-detalii',
  templateUrl: './detalii.component.html',
  styleUrls: ['./detalii.component.css']
})
export class DetaliiComponent implements OnInit {
  constructor(private confirmationDialogService: ConfirmationDialogService) { }

  public openDialog() {
    this.confirmationDialogService.confirm('', 'Activezi acest abonament?')
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
