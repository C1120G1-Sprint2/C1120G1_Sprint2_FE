import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';
import {ActivatedRoute} from '@angular/router';
import {MovieTicket} from '../../../../model/movieTicket';
import {RoomSeat} from '../../../../model/roomSeat';

@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css']
})
export class GetTicketComponent implements OnInit {
  public ticketDetail: Ticket;
  listChoseSeat: RoomSeat[] = [];
  movieTicket: MovieTicket;
  receiveId: number;
  totalMoney: number;

  constructor(private bookTicketService: BookTicketsManagementService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookedTicket();
  }

  getBookedTicket() {
    let index = this.activatedRoute.snapshot.params['ticketId'];
    this.bookTicketService.getBookedTicketByIndex(index).subscribe(data => {
      this.ticketDetail = data;
    });
    if (this.bookTicketService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketService.listChoseSeat;
      this.movieTicket = this.bookTicketService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    }
  }

  getTotalMoney(listChoseSeat: RoomSeat[]) {
    let total: number = 0;
    for (let roomSeat of listChoseSeat) {
      if (roomSeat.seat.seatType.seatTypeId == 1) {
        total += this.movieTicket.ticketPrice;
      } else {
        total += this.movieTicket.ticketPrice * (4 / 3);
      }
    }
    return Math.round(total);
  }

  printBookedTicket() {
    let index = this.activatedRoute.snapshot.params['ticketId'];
    this.bookTicketService.printTicketByTicketId(index).subscribe(data => {
      this.ticketDetail = data;
    });
  }

  receiveSuccess() {
    this.printBookedTicket();
  }
}
