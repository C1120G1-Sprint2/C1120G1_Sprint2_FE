import { Component, OnInit } from '@angular/core';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {Ticket} from '../../../model/ticket';
import {MovieTicket} from '../../../model/movieTicket';
import {Seat} from '../../../model/seat';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  listCol:number[] = [];
  listRow:string[] = [];

  listSeat: Seat[] = [];
  seatNumber:number;
  ticket:Ticket;
  movieTicket:MovieTicket;

  constructor(private bookTicketsService:BookTicketsService) { }

  ngOnInit(): void {
    this.ticket = this.bookTicketsService.ticket;
    this.movieTicket = this.ticket.movieTicket;
    this.getAllSeat(this.movieTicket.room.roomId);
  }

  getAllSeat(roomId:number){
    this.bookTicketsService.getAllSeat(roomId).subscribe(data => {
      this.listSeat = data;
      console.log(this.listSeat)
      for(let seat of this.listSeat) {
        if (this.listCol.indexOf(seat.column.columnName) == -1) {
          this.listCol.push(seat.column.columnName);
        }
        if (this.listRow.indexOf(seat.row.rowName) == -1) {
          this.listRow.push(seat.row.rowName);
        }
      }
      console.log(this.listRow);
      console.log(this.listCol);

    }, error =>  {
      console.log("get "+error+" at getAllSeat() on SeatSelectionComponent");
    })
  }

  chooseSeat(col:number, row:string) {
    let seat = col + row;
    document.getElementById(seat).style.backgroundColor;
  }



}
