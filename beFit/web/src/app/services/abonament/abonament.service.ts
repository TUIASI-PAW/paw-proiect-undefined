import { AbonamentCreateModel } from './../models/abonament/abonament.create.model';
import { AbonamentLiteModel } from './../models/abonament/abonament.lite.model';
import { PaginationModel } from './../models/pagination/pagination.model';
import { AbonamentPaginatedModel } from './../models/abonament/abonament.paginated.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonamentService {
  public endpoint = `${environment.apiUrl}/abonament`;

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAll(): Observable<AbonamentLiteModel[]> {
    return this.httpClient.get<AbonamentLiteModel[]>(`${this.endpoint}/`);
  }

  public getAllPaginated(data: AbonamentPaginatedModel): Observable<PaginationModel> {
    return this.httpClient.post<PaginationModel>(`${this.endpoint}/filters/pagination`, data);
  }

  public deleteAb(abonamentId: number): Observable<unknown> {
    return this.httpClient.delete(`${this.endpoint}/${abonamentId}`);
  }

  public addAb(data: AbonamentCreateModel): Observable<unknown> {
    return this.httpClient.post(`${this.endpoint}/`, data);
  }

}
