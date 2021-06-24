import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';
import {ActivatedRoute} from '@angular/router';
import {MovieTicket} from '../../../../model/movieTicket';

@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css']
})
export class GetTicketComponent implements OnInit {
  public ticketDetail: Ticket;
  receiveId: number;

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
