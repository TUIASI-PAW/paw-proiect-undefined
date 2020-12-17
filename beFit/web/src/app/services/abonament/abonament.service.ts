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
  public getAll(): Observable<unknown> {
    return this.httpClient.get(`${this.endpoint}/`);
  }
}
