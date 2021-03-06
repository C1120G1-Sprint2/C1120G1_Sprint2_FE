import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {TokenStorageService} from '../security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  httpOptions: any;
  API_URL: string = 'http://localhost:8080/account'
  constructor(private httpClient: HttpClient,
              private tokenStore: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }



  getUserByUserName(username: string): Observable<User> {
    console.log(this.tokenStore.getUser().user.account.username);

    return this.httpClient.get<User>(this.API_URL  + '/' + this.tokenStore.getUser().user.account.username);
  }
}
