import { Injectable } from '@angular/core';
import {User} from "../../../model/user";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Account} from "../../../model/account";

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  API_URL_USER: string = 'http://localhost:8080/member';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  getUserById(username: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL_USER + '/infoUser/' + username);
  }

  editUser(user: User, username: string): Observable<User> {
    console.log(username);
    console.log(user);
    return this.httpClient.put<User>(this.API_URL_USER + '/editUser/' + username, user);
  }
  getUserByUserName(username: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL_USER + '/user/'+ username);
  };

  getPasswordOld(username: string): Observable<Account> {
    return this.httpClient.get<Account>(this.API_URL_USER + '/account/'+ username);
  }
  setNewPassword(username: string, newPassword: string): Observable<void> {
    return this.httpClient.post<void>(this.API_URL_USER + '/setPass/' + username + '/' + newPassword, this.httpOptions);
  }
}
