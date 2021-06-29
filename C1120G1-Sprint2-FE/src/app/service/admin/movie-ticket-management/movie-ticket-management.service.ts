import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MovieTicket} from '../../../model/movieTicket';
import {Movie} from '../../../model/movie';
import {ShowTime} from '../../../model/showTime';
import {ProjectionType} from '../../../model/projectionType';
import {Room} from '../../../model/room';
import {MovieTicketDTO} from '../../../model/movieTicketDTO';

@Injectable({
  providedIn: 'root'
})
export class MovieTicketManagementService {
  API_URL_MOVIE_TICKET: string = 'http://localhost:8080/api/admin/movie-ticket';
  API_URL_MOVIE: string = 'http://localhost:8080/api/admin/list-movie';
  API_URL_SHOW_TIME: string = 'http://localhost:8080/api/showTime';
  API_URL_ROOM: string = 'http://localhost:8080/api/admin/room';
  API_URL_PROJECTION_TYPE: string = 'http://localhost:8080/api/admin/projection-type';
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
  getAllMovieTicket(page: number, size: number, onSorting: boolean, textSorting: string): Observable<any> {
    return this.httpClient.get(this.API_URL_MOVIE_TICKET + '?page=' + page + '&size=' + size +  '&textSorting=' + textSorting + '&onSorting=' + onSorting);
  }
  editMovieTicket(movieTicket: MovieTicket, id: number): Observable<MovieTicket> {
    return this.httpClient.put<MovieTicket>(this.API_URL_MOVIE_TICKET + '/edit/' + id, movieTicket);
  }
  createMovieTicket(movieTickets: MovieTicket[]):Observable<void> {
    // selectedShowTime: ShowTime[]
    console.log(movieTickets);
    // console.log(selectedShowTime);
  // , selectedShowTime
    return this.httpClient.post<void>(this.API_URL_MOVIE_TICKET + '/create', movieTickets);
  }
  getAllMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.API_URL_MOVIE);
  }
  getAllShowTime(): Observable<ShowTime[]> {
    return this.httpClient.get<ShowTime[]>(this.API_URL_SHOW_TIME);
  }
  getAllProjectionType(): Observable<ProjectionType[]> {
    return this.httpClient.get<ProjectionType[]>(this.API_URL_PROJECTION_TYPE);
  }
  getAllRoom():Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.API_URL_ROOM);
  }
  getMovieTicketById(id: number): Observable<MovieTicket> {
    return this.httpClient.get<MovieTicket>(this.API_URL_MOVIE_TICKET + '/' + id);
  }

  deleteMovieTicket(id: number): Observable<MovieTicket> {
    return this.httpClient.delete<MovieTicket>(this.API_URL_MOVIE_TICKET + '/delete/' + id);
  }
  getRoomById(id:number): Observable<any> {
    return this.httpClient.get(this.API_URL_ROOM + '/' + id);
  }
  getProjectionTypeById(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL_PROJECTION_TYPE + '/' + id);
  }
  getShowTimeById(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL_SHOW_TIME + '/' + id);
  }

  getMovieTicketByKeySearch(keySearch: string, size: number): Observable<any> {
    return this.httpClient.get(this.API_URL_MOVIE_TICKET + '/search' + '?q=' + keySearch + '&size=' + size);
  }
}
