import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalManagementService {

  private API_URL = "http://localhost:8080/api/statistical";

  constructor(private _httpClient: HttpClient) { }

  getMovieStatisticsByDate(startDate: string, endDate: string): Observable<any> {
    return this._httpClient.get<any>(`${this.API_URL}/movie-date?startDate=${startDate}&endDate=${endDate}`);
  }

  getMovieStatisticsByMonth(month: number, year: number): Observable<any> {
    return this._httpClient.get<any>(`${this.API_URL}/movie-month?month=${month}&year=${year}`);
  }

  getMovieStatisticsByYear(year: number): Observable<any> {
    return this._httpClient.get<any>(`${this.API_URL}/movie-year?year=${year}`);
  }

  getTopMember(limit: number): Observable<any> {
    return this._httpClient.get<any>(`${this.API_URL}/member-top?limit=${limit}`);
  }
}
