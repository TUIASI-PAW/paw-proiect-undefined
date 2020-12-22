import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppUser } from '../models/user/app.user';
import { UserDetailsModel } from '../models/user/user.details.model';
import { UserUpdateModel } from '../models/user/user.update.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:AppUser;
  private endpoint:String= environment.apiUrl+"/user";

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly authenticationService:AuthenticationService
  ) {
    this.user = authenticationService.getUserData();
  }

  public get(): Observable<UserDetailsModel>{
    return this.httpClient.get<UserDetailsModel>(`${this.endpoint}/${this.user.id}`);
  }
  public addBalance(): Observable<unknown>
  {
    return this.httpClient.patch(`${this.endpoint}/${this.user.id}/balance`,{});
  }
  public update(model:UserUpdateModel):Observable<UserDetailsModel>
  {
    return this.httpClient.patch<UserDetailsModel>(`${this.endpoint}/${this.user.id}`,model);
  }
  public buy(abId:string):Observable<unknown>{
    return this.httpClient.post<UserDetailsModel>(`${this.endpoint}/${this.user.id}/abonament/${abId}`,{});
  }
}