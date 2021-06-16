import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../model/room';
import {Seat} from '../../../model/seat';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {

  public baseUrl = 'http://localhost:8080/api/admin';
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

  getAllRoom(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseUrl + '/room');
  }

  getAllSeat(): Observable<Seat[]> {
    return this.httpClient.get<Seat[]>(this.baseUrl + '/seat');
  }

  createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.baseUrl + '/room/create-room', room);
  }

  createSeat(seat: Seat): Observable<Seat> {
    return this.httpClient.post<Seat>(this.baseUrl + '/seat/create-seat', seat);
  }

  updateRoom(id,room): Observable<Room> {
    return this.httpClient.put<Room>(this.baseUrl + '/room/edit' + id ,room);
  }
  updateSeat(id,seat): Observable<Seat> {
    return this.httpClient.put<Seat>(this.baseUrl + '/seat/edit' + id, seat);
  }

  deleteRoom(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.baseUrl + '/room/delete/' + id);
  }

  deleteSeat(id: number): Observable<Seat> {
    return this.httpClient.get<Seat>(this.baseUrl + '/seat/delete/' + id);
  }
}
