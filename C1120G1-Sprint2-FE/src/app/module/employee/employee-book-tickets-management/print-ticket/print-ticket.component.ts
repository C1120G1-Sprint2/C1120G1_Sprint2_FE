import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css']
})
export class PrintTicketComponent implements OnInit {
  public ticketPrint: Ticket;

  constructor(private bookTicketService: BookTicketsManagementService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let index = this.activatedRoute.snapshot.params['ticketId'];
    this.bookTicketService.printTicketByTicketId(index).subscribe(data => {
      this.ticketPrint = data;
    });
  }

}
