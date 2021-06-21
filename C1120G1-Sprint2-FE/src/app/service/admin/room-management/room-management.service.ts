import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../model/room';
import {Seat} from '../../../model/seat';
import {StatusRoom} from '../../../model/statusRoom';
import {Row} from '../../../model/row';
import {Columns} from '../../../model/columns';
import {SeatType} from '../../../model/seatType';

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

  getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.baseUrl + '/room/' + id);
  }

  createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.baseUrl + '/room/create-room', room);
  }

  createSeat(seat: Seat): Observable<Seat> {
    return this.httpClient.post<Seat>(this.baseUrl + '/seat/create-seat', seat);
  }

  updateRoom(id, room): Observable<Room> {
    return this.httpClient.put<Room>(this.baseUrl + '/room/edit-room/' + id, room);
  }

  updateSeat(seat): Observable<Seat> {
    console.log(this.baseUrl + '/seat/edit-seat');
    return this.httpClient.put<Seat>(this.baseUrl + '/seat/edit-seat', seat);
  }

  deleteRoom(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.baseUrl + '/room/delete-room/' + id);
  }

  deleteSeat(id: number): Observable<Seat> {
    return this.httpClient.get<Seat>(this.baseUrl + '/seat/delete-seat/' + id);
  }

  getAllRoomStatus(): Observable<StatusRoom[]> {
    return this.httpClient.get<StatusRoom[]>(this.baseUrl + '/room-status');
  }

  searchRoom(roomName: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseUrl + '/room/search?' +
      'roomName=' + roomName);
  }

  searchRoomAbsolute(roomName: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseUrl + '/room/searchAbsolute?' +
      'roomName=' + roomName);
  }

  getAllRow(): Observable<Row[]> {
    return this.httpClient.get<Row[]>(this.baseUrl + '/row');
  }

  getAllColumn(): Observable<Columns[]> {
    return this.httpClient.get<Columns[]>(this.baseUrl + '/column');
  }

  getSeatByRowIdAndColumnId(rowId, columnId): Observable<Seat[]> {
    return this.httpClient.get<Seat[]>(this.baseUrl + '/seat/findseat?' + 'rowId=' + rowId + 'columnId' + columnId);
  }

  getAllSeatType(): Observable<SeatType[]> {
    return this.httpClient.get<SeatType[]>(this.baseUrl + '/seat-type');
  }
}
