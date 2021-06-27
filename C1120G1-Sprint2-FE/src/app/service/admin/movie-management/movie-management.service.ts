import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../../../model/movie';
import {Observable} from 'rxjs';
import {MovieDTO} from '../../../model/dto/movieDTO';

@Injectable({
  providedIn: 'root'
})
export class MovieManagementService {
  httpOptions: any;
  baseUrl = 'http://localhost:8080/api/movie';

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public formAddMovie(listMovieDTO: MovieDTO[]): Observable<Movie>{
    return this.http.post<any>(this.baseUrl + '/add_movie', listMovieDTO);
  }

  public getCategory(): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/category');
  }

  public getAllMovie(page: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/movie_ava?page=' + page);
  }

  public deleteMovie(id: number): Observable<any>{
    return this.http.put(this.baseUrl + '/set_status/' + id, this.httpOptions);
  }

}
