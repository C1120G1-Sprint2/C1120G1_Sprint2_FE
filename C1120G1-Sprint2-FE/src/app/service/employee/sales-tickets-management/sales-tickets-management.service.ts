import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Seat} from '../../../model/seat';
import {MovieTicket} from '../../../model/movieTicket';
import {MemberTicketDTO} from '../../../model/memberTicketDTO';

@Injectable({
  providedIn: 'root'
})
export class SalesTicketsManagementService {
  public listSeatSource = new BehaviorSubject<Seat[]>([]);
  public listSeatCurrent = this.listSeatSource.asObservable();
  public movieTicket = new BehaviorSubject<MovieTicket>(null);
  public currentMovieTicket = this.movieTicket.asObservable();
  public API_MOVIE_TICKET = 'http://localhost:8080/api/employee/saleTicket';

  constructor(private http: HttpClient) {
  }

  changeListChoseSeat(listSeat: Seat[]) {
    this.listSeatSource.next(listSeat);
  }

  changeMovieTicket(movieTicket: MovieTicket) {
    this.movieTicket.next(movieTicket);
  }

  public showAllMovieTicket(): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listMovieTicket');
  }

  public showAllMovieTicketByMovieId(movieId: number): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listMovieTicket/' + movieId);
  }

  public showAllMovieTicketByIdAndShowDate(movieId: number, showDate: string): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listMovieTicket/' + movieId + '/' + showDate);
  }

  public findMovieTicketBySelect(movieId: number, showDate: string, showTime: number): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/movieTicket/' + movieId + '/' + showDate + '/' + showTime);
  }

  public findMovieTicketById(movieTicketId: number): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/movieTicket/' + movieTicketId);
  }

  public showAllSeatByRoomId(roomId: number): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listSeat/' + roomId);
  }

  public createTicket(ticketDTO: MemberTicketDTO): Observable<any> {
    return this.http.post(this.API_MOVIE_TICKET + '/createTicket', ticketDTO);
  }
}
