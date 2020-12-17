import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuthModel } from '../models/user/user.auth.model';
import { UserRegisterModel } from '../models/user/user.register.model';
import { environment } from 'src/environments/environment';
import { AppUser } from '../models/user/app.user';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { UserTokenModel } from '../models/user/user.token.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public endpoint = `${environment.apiUrl}/auth`;

  private userSubject: BehaviorSubject<AppUser>;
  public user: Observable<AppUser>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {

    const data = localStorage.getItem('user');
    const user = data == null ? null : JSON.parse(data);

    this.userSubject = new BehaviorSubject<AppUser>(user);
    this.user = this.userSubject.asObservable();

  }

  public get userValue(): AppUser {
    return this.userSubject.value;
  }


  public signin(data: UserAuthModel): Observable<unknown> {
    return this.httpClient.post(`${this.endpoint}/signin`, data)
      .pipe(map((response) => {

        let data: any = response;
        const { token } = data;

        const decodedToken = jwt_decode(token) as any;
        const user: AppUser = {
          email: decodedToken.sub,
          id: decodedToken.user_id,
          role: decodedToken.auth[0].authority,
          token: token
        };

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  public signup(data: UserRegisterModel): Observable<unknown> {
    return this.httpClient.post(`${this.endpoint}/signup`, data)
      .pipe(map((response) => {
        let data: any = response;
        const { token } = data;

        const decodedToken = jwt_decode(token) as any;
        console.log(decodedToken);

        const user: AppUser = {
          email: decodedToken.sub,
          id: decodedToken.user_id,
          role: decodedToken.auth[0].authority,
          token: token
        };

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['autentificare']);
  }

  getUserData(): AppUser {
    const user: AppUser = JSON.parse(localStorage.getItem('user'));
    return user;
  }

}
