import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../../../model/ticket";

@Injectable({
  providedIn: 'root'
})
export class BookTicketsService {

  API_URL_TICKET: string = 'http://localhost:8080/member';
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

  findAll(username: string,page: number): Observable<any> {
    console.log(username);
    console.log(this.API_URL_TICKET + '/booking?page='+ page+ '&&username='+username)
    return this.httpClient.get<any>(this.API_URL_TICKET + '/booking'+'?page='+ page+ '&&username='+username );
  };

  deleteByIdTickets(deleteId: number): Observable<Ticket> {
    console.log(deleteId);
    console.log(this.API_URL_TICKET + '/booking/'+ deleteId)
    return this.httpClient.delete<Ticket>(this.API_URL_TICKET + '/cancelTicket/' + deleteId);
  }

}
