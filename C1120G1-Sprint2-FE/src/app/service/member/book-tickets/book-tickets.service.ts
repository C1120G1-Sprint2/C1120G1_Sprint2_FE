import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../../model/movie';
import {ShowTime} from '../../../model/showTime';
import {MovieTicket} from '../../../model/movieTicket';
import {User} from '../../../model/user';
import {RoomSeat} from '../../../model/roomSeat';

const API_TICKET: string = 'http://localhost:8080/api/ticket';
const API_SEAT: string = 'http://localhost:8080/api/roomSeat';
const API_PAYPAL: string = 'http://localhost:8080/api/paypal';

@Injectable({
  providedIn: 'root'
})

export class BookTicketsService {

  httpOptions: any;
  user: User;
  movieTicket: MovieTicket;
  listChoseSeat: RoomSeat[] = [];

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
   * Author: HoangTQ
   * getAllMovie(), getAllShowTime(), getMovieTicket(), getAllSeat(), getMovieTicketById(), createTicket()
   */

  getAllMovie(): Observable<Movie[]> {
    return this.http.get<Movie[]>(API_TICKET + '/listMovie');
  }

  getAllShowTime(date: String, movieId: number): Observable<ShowTime[]> {
    return this.http.get<ShowTime[]>(API_TICKET + '/listShowTime/' + date + '/' + movieId);
  }

  getMovieTicket(movieId: number, date: string, showTimeId: number): Observable<MovieTicket> {
    return this.http.get<MovieTicket>(API_TICKET + '/movieTicket/' + movieId + '/' + date + '/' + showTimeId);
  }

  getAllSeat(roomId: number): Observable<RoomSeat[]> {
    return this.http.get<RoomSeat[]>(API_SEAT + '/getAllSeat/' + roomId);
  }

  getMovieTicketById(movieTicketId: number): Observable<MovieTicket> {
    return this.http.get<MovieTicket>(API_TICKET + '/getMovieTicket/' + movieTicketId);
  }

  createTicketDTO(movieTicketId: number, userId: number, seatId: number): Observable<any> {
    return this.http.post(API_TICKET + '/createTicketDTO/' + movieTicketId + '/' + userId + '/' + seatId, this.httpOptions);
  }

  payViaPaypal(totalMoney: number): Observable<any> {
    return this.http.post(API_PAYPAL + '/pay', 5, this.httpOptions);
  }
}
