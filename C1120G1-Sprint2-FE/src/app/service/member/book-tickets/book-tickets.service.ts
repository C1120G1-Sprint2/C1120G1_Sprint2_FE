import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../../model/movie';
import {ShowTime} from '../../../model/showTime';
import {MovieTicket} from '../../../model/movieTicket';
import {Ticket} from '../../../model/ticket';
import {Seat} from '../../../model/seat';

const API_TICKET: string = 'http://localhost:8080/api/ticket';
const API_SEAT: string = 'http://localhost:8080/api/seat';

@Injectable({
  providedIn: 'root'
})

export class BookTicketsService {

  httpOptions: any;
  ticket:Ticket = new Ticket();

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
   * getAllMovie(), getAllShowTime(), getMovieTicket(), createUserGoogle, createUserFacebook
   */

  getAllMovie():Observable<Movie[]> {
    return this.http.get<Movie[]>(API_TICKET +"/listMovie");
  }

  getAllShowTime(date: String, movieId:number):Observable<ShowTime[]> {
    return this.http.get<ShowTime[]>(API_TICKET+"/listShowTime/"+ date+"/"+movieId);
  }

  getMovieTicket(movieId: number, date: string, showTimeId: number):Observable<MovieTicket> {
    return this.http.get<MovieTicket>(API_TICKET + "/movieTicket/"+movieId+"/"+date+"/"+showTimeId);
  }

  getAllSeat(roomId : number):Observable<Seat[]> {
    return this.http.get<Seat[]>(API_SEAT+"/getAllSeat/"+roomId);
  }
}
