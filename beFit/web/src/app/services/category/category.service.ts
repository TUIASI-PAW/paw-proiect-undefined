import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategorieModel } from '../models/abonament/abonament.categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public endpoint = `${environment.apiUrl}/category`;

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAll(): Observable<CategorieModel[]> {
    return this.httpClient.get<CategorieModel[]>(`${this.endpoint}/`);
  }
}
