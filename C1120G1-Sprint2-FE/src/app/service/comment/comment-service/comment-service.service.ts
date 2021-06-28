import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../../security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private COMMENT_API: string = 'http://localhost:8080/api';
  // private COMMENT_API_MOVIE: string = 'http://localhost:8080/api/comment-movie';
  private httpOptions: any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset = utf-8',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  getAllCommentByMovieId(idMovie: number):Observable<any> {
    console.log(this.httpOptions);
    return this.http.get(this.COMMENT_API + '/comment/detail-movie/' + idMovie);
  }

  getAllComment():Observable<any> {
    return this.http.get(this.COMMENT_API);
  }

  addComment(value: any, id: any): Observable<any> {
    return this.http.post(this.COMMENT_API + "/detail-movie/" + id + '/create', value);
  }

  deleteCommentByUser(id: any) {
    return this.http.delete(this.COMMENT_API + '/comment/delete/' + id);
  }

  updateComment(id: number, content: string) {
    return this.http.put(this.COMMENT_API + "/comment/edit", {id: id, body: content});
  }
}
