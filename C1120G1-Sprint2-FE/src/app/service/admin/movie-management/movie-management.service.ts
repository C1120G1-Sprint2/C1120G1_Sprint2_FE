import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_TICKET: string = 'http://localhost:8080/api/movie';

@Injectable({
  providedIn: 'root'
})

export class MovieManagementService{

  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': "true"
    }
  }

  /**
   * Author: HoangTQ
   *
   */

}
