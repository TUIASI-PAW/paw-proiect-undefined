import { AbonamentUpdateModel } from './../models/abonament/abonament.update.model';
import { AbonamentModel } from './../models/abonament/abonament.model';
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

  public getById(abonamentId: number): Observable<AbonamentModel> {
    return this.httpClient.get<AbonamentModel>(`${this.endpoint}/${abonamentId}`);
  }

  public getAll(): Observable<AbonamentLiteModel[]> {
    return this.httpClient.get<AbonamentLiteModel[]>(`${this.endpoint}/`);
  }

  public getAllPaginated(data: AbonamentPaginatedModel): Observable<PaginationModel> {
    return this.httpClient.post<PaginationModel>(`${this.endpoint}/filters/pagination`, data);
  }
  public get(id: string): Observable<AbonamentModel> {
    return this.httpClient.get<AbonamentModel>(`${this.endpoint}/${id}`);
  }

  public deleteAb(abonamentId: number): Observable<unknown> {
    return this.httpClient.delete(`${this.endpoint}/${abonamentId}`);
  }

  public addAb(data: AbonamentCreateModel): Observable<unknown> {
    return this.httpClient.post(`${this.endpoint}/`, data);
  }

  public updateAb(abonamentId: number, data: AbonamentUpdateModel): Observable<unknown> {
    return this.httpClient.put(`${this.endpoint}/${abonamentId}`, data)
  }

}
