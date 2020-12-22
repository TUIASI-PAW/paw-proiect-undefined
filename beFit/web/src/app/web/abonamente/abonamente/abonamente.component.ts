import { PaginationModel } from './../../../services/models/pagination/pagination.model';
import { AbonamentPaginatedModel } from './../../../services/models/abonament/abonament.paginated.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { PageEvent } from '@angular/material/paginator';
import { CategorieModel } from '../../../services/models/abonament/abonament.categorie.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AbonamentService } from './../../../services/abonament/abonament.service';
import { CategoryService } from 'src/app/services/category/category.service';



@Component({
  selector: 'app-abonamente',
  templateUrl: './abonamente.component.html',
  styleUrls: ['./abonamente.component.css'],
  providers: [AuthenticationService, CategoryService, AbonamentService]
})
export class AbonamenteComponent implements OnInit {

  public isLoadingData = false;
  public isLoadingCategories = false;

  public paginationModel: PaginationModel;
  public categorii: CategorieModel[];

  public pageEvent!: PageEvent;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [5, 10, 15, 20, 25];
  public abonamenteCount: number;
  public selectedCategory:string= null;



  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly abonamentService: AbonamentService,
    private readonly categoryService: CategoryService
  ) {
    if (this.authenticationService.userValue)
      if (this.authenticationService.getUserData().role == 'ROLE_ADMIN') this.router.navigate(['admin']);


    let paginationData: AbonamentPaginatedModel = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: "id",
      filter: null
    };

    this.isLoadingCategories = true;
    this.categoryService.getAll().subscribe(c => {
      this.categorii = c;
      this.isLoadingCategories = false;
    });

    this.isLoadingData = true;
    this.abonamentService.getAllPaginated(paginationData).subscribe(response => {
      this.paginationModel = response;
      this.paginationModel.abonamentList.forEach(ab => {
        ab.image = "data:image/jpeg;base64," + ab.image;
      });
      this.abonamenteCount = this.paginationModel.dbAbsCount;
      this.isLoadingData = false;
    });
  }

  public update(event: PageEvent): PageEvent {

    let paginationData: AbonamentPaginatedModel = {
      pageNo: event.pageIndex,
      pageSize: event.pageSize,
      sortBy: "title",
      filter: this.selectedCategory
    };

    this.abonamentService.getAllPaginated(paginationData).subscribe(response => {
      this.paginationModel = response;
      this.abonamenteCount= response.dbAbsCount;
      this.paginationModel.abonamentList.forEach(ab => {
        ab.image = "data:image/jpeg;base64," + ab.image;
      });
    });
    return event;
  }

  public updateByCategory(){
    let pe = new PageEvent();
    pe.pageIndex=0;
    pe.pageSize=this.pageSize;
    this.pageEvent= this.update(pe);
  }

  public removeFilters():void
  {
    this.selectedCategory=null;
    this.updateByCategory();
  } 

  ngOnInit(): void {
  }

}
