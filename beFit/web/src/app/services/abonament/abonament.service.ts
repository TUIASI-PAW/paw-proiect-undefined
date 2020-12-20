import { PaginationModel } from './../models/pagination/pagination.model';
import { AbonamentPaginatedModel } from './../models/abonament/abonament.paginated.model';
import { AbonamentListModel } from './../models/abonament/abonament.list.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbonamentModel } from '../models/abonament/abonament.model';

@Injectable({
  providedIn: 'root'
})
export class AbonamentService {
  
  public endpoint = `${environment.apiUrl}/abonament`;

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAll(): Observable<AbonamentListModel[]> {
    return this.httpClient.get<AbonamentListModel[]>(`${this.endpoint}/`);
  }

  public getAllPaginated(data: AbonamentPaginatedModel): Observable<PaginationModel> {
    return this.httpClient.post<PaginationModel>(`${this.endpoint}/filters/pagination`, data);
  }
  public get(id: string): Observable<AbonamentModel> {
    return this.httpClient.get<AbonamentModel>(`${this.endpoint}/${id}`);
  }

}
