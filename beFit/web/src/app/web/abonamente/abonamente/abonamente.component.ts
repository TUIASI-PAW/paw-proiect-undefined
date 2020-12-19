import { PaginationModel } from './../../../services/models/pagination/pagination.model';
import { AbonamentPaginatedModel } from './../../../services/models/abonament/abonament.paginated.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PageEvent } from '@angular/material/paginator';
import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AbonamentService } from './../../../services/abonament/abonament.service';


@Component({
  selector: 'app-abonamente',
  templateUrl: './abonamente.component.html',
  styleUrls: ['./abonamente.component.css']
})
export class AbonamenteComponent implements OnInit {

  public paginationModel: PaginationModel = {
    abonamentList: [],
    dbAbsCount: -1
  }
  
  public categorii: CategorieModel[];
  
  public pageEvent!: PageEvent;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [5, 10, 15, 20, 25];
  public abonamenteCount: number;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly abonamentService: AbonamentService
  ) {
    if (this.authenticationService.userValue)
      if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);

    this.categorii = [{id: 0, text: 'aerobica'}];

    let paginationData: AbonamentPaginatedModel = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: "id",
      filter: null
    };

    this.abonamentService.getAllPaginated(paginationData).subscribe(response => {
      this.paginationModel = response;
      this.paginationModel.abonamentList.forEach(ab => {
        ab.image = "data:image/jpeg;base64," + ab.image;
      });
      this.abonamenteCount = this.paginationModel.dbAbsCount;
    });
  }

  public update(event: PageEvent): PageEvent {
    let paginationData: AbonamentPaginatedModel = {
      pageNo: event.pageIndex,
      pageSize: event.pageSize,
      sortBy: "id",
      filter: null
    };
    console.log(paginationData);

    this.abonamentService.getAllPaginated(paginationData).subscribe(response => {
      this.paginationModel = response;
      this.paginationModel.abonamentList.forEach(ab => {
        ab.image = "data:image/jpeg;base64," + ab.image;
      });
    });
    return event;
  }

  ngOnInit(): void {
  }
  
}
