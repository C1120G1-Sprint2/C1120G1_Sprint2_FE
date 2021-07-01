import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthLogin} from '../../model/authLogin';
import {UserSocial} from '../../model/userSocial';

const API_URL = 'http://localhost:8080/api/';
const BASE_API_URL = 'http://localhost:8080/';
const API_URL_GOOGLE: string = 'http://localhost:8080/api/login/google';
const API_URL_FACEBOOK: string = 'http://localhost:8080/api/login/facebook';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  /**
   * Author: ThuanNN
   * All functions below
   */

  login(authLogin: AuthLogin): Observable<any> {
    return this.http.post<any>(API_URL + 'login', authLogin, this.httpOptions);
  }

  checkEmail(email: string): Observable<string> {
    console.log('Email on service: ' + email);
    return this.http.get<string>(API_URL + 'checkEmail/' + email);
  }

  createUserGoogle(user: UserSocial): Observable<any> {
    return this.http.post<any>(API_URL_GOOGLE, user, this.httpOptions);
  }

  createUserFacebook(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(API_URL_FACEBOOK, user, this.httpOptions);
  }
  confirmEmail(username: string, email: string): Observable<any> {
    return this.http.put<any>(BASE_API_URL + 'register/confirmEmail/' +  username + '/' + email, this.httpOptions)
  }
}
