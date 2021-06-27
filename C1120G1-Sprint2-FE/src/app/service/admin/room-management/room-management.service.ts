import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../model/room';
import {Seat} from '../../../model/seat';
import {StatusRoom} from '../../../model/statusRoom';
import {Row} from '../../../model/row';
import {Column} from '../../../model/column';
import {SeatType} from '../../../model/seatType';
import {RoomSeat} from '../../../model/roomSeat';

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

  getAllRoom(page: number, keySearch: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseUrl + '/room?page=' + page + '&&roomName='+keySearch);
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

  updateSeat(seat:Seat): Observable<Seat> {
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


  searchRoomAbsolute(roomName: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseUrl + '/room/searchAbsolute?' +
      'roomName=' + roomName);
  }

  getAllRow(): Observable<Row[]> {
    return this.httpClient.get<Row[]>(this.baseUrl + '/row');
  }


  getSeatByRowIdAndColumnId(rowId, columnId): Observable<Seat[]> {
    return this.httpClient.get<Seat[]>(this.baseUrl + '/seat/findseat?' + 'rowId=' + rowId + 'columnId' + columnId);
  }

  getAllSeatType(): Observable<SeatType[]> {
    return this.httpClient.get<SeatType[]>(this.baseUrl + '/seat-type');
  }

  getAllSeatByRoomId(id:number): Observable<RoomSeat[]> {
    return this.httpClient.get<RoomSeat[]>(this.baseUrl + '/roomSeat/' + id);
  }
}
