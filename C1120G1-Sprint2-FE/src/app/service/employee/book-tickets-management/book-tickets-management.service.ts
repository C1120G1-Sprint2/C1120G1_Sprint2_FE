import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookTicketsManagementService {
  httpOptions: any;
  private API_BASE_URL = 'http://localhost:8080/api/ticket';
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  getAllBookedTicketList(): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/', this.httpOptions);
  }

  getBookedTicketByIndex(ticketId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/get-ticket/' + ticketId, this.httpOptions);
  }

  searchTicketByTicketId(ticketId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/search-ticketId' + '?ticketId=' + ticketId, this.httpOptions);
  }

  searchTicketByUserId(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/search-userId' + '?userId=' + userId, this.httpOptions);
  }

  searchTicketByIdCard(idCard: string): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/search-idCard' + '?idCard=' + idCard, this.httpOptions);
  }

  searchTicketByPhone(phone: string): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/search-phone' + '?phone=' + phone, this.httpOptions);
  }

  confirmTicket(ticketId: number): Observable<any> {
    return this.httpClient.put<any>(this.API_BASE_URL + '/booked-ticket-list/get-ticket/confirm-ticket/' + ticketId, this.httpOptions);
  }

  printTicketByTicketId(ticketId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_BASE_URL + '/booked-ticket-list/get-ticket/print-ticket/' + ticketId, this.httpOptions);
  }

  cancelTicket(ticketId: number): Observable<any> {
    return this.httpClient.put<any>(this.API_BASE_URL + '/booked-ticket-list/cancel-ticket/' + ticketId, this.httpOptions);
  }
}
