import { AbonamentModel } from './../models/abonament/abonament.model';
import { AbonamentCreateModel } from './../models/abonament/abonament.create.model';
import { AbonamentLiteModel } from './../models/abonament/abonament.lite.model';
import { PaginationModel } from './../models/pagination/pagination.model';
import { AbonamentPaginatedModel } from './../models/abonament/abonament.paginated.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public addAb(data: AbonamentCreateModel, image: File): Observable<unknown> {

    var blobData = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });

    let formData = new FormData();
    formData.append('image', image);
    formData.append('model', blobData);

    return this.httpClient.post(`${this.endpoint}/`, formData);
  }

  public updateAb(abonamentId: number, data: AbonamentCreateModel, image: File): Observable<unknown> {

    var blobData = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });

    let formData = new FormData();
    formData.append('image', image);
    formData.append('model', blobData);

    return this.httpClient.put(`${this.endpoint}/${abonamentId}`, formData)
  }
  public changeActive(activeVal: boolean, abonamentId: number): Observable<unknown> {
    if (activeVal) return this.httpClient.patch(`${this.endpoint}/${abonamentId}/activate`,{});
    else return this.httpClient.patch(`${this.endpoint}/${abonamentId}/deactivate`,{});
  }
}
