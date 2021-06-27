import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShowTime} from "../../model/showTime";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  private API_SHOWTIME_URL = "http://localhost:8080/api/showtime";

  constructor(private httpClient: HttpClient) {
  }

  getAllShowtimes(): Observable<ShowTime[]> {
    return this.httpClient.get<ShowTime[]>(this.API_SHOWTIME_URL);
  }

}
