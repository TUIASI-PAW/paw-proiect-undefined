import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogService} from '../../shared/components/dialog/dialog.service';
@Component({
  selector: 'app-actualizare',
  templateUrl: './actualizare.component.html',
  styleUrls: ['./actualizare.component.css']
})
export class ActualizareComponent implements OnInit {
  constructor(private confirmationDialogService: ConfirmationDialogService) { }

  public openDialog() {
    this.confirmationDialogService.confirm('', 'Eşti sigur că vrei să salvezi modificările făcute?')
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
