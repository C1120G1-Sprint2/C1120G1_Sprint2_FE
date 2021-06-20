import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesTicketsManagementService {
  public API_MOVIE_TICKET = 'http://localhost:8080/api/employee/saleTicket';

  constructor(private http: HttpClient) {
  }

  public showAllMovieTicket(): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listMovieTicket');
  }

  public showAllMovieTicketById(movieId: number): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listMovieTicket/' + movieId);
  }

  public showAllMovieTicketByIdAndShowDate(movieId: number, showDate: string): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/listMovieTicket/' + movieId + '/' + showDate);
  }

  public findMovieTicketBySelect(movieId: number, showDate: string, showTime: number): Observable<any> {
    return this.http.get(this.API_MOVIE_TICKET + '/movieTicket/' + movieId + '/' + showDate + '/' + showTime);
  }
}
