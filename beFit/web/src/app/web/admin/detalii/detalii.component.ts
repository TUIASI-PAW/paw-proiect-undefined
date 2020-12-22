import { AbonamentService } from 'src/app/services/abonament/abonament.service';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AbonamentModel } from '../../../services/models/abonament/abonament.model';

@Component({
  selector: 'app-detalii',
  templateUrl: './detalii.component.html',
  styleUrls: ['./detalii.component.css']
})
export class DetaliiComponent implements OnInit {

  public details!: AbonamentModel;
  public redirectId!: string;
  public redirectIdNumber: number;
  public isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly abonamentService: AbonamentService,
  ) {

    this.redirectId = this.router.url.split('/').slice(-1)[0];
    this.redirectIdNumber = +this.redirectId;

    this.isLoading = true;
    this.abonamentService.getById(this.redirectIdNumber).subscribe(response => {
      this.details = response;
      this.details.image = "data:image/jpeg;base64," + this.details.image;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
  }

}