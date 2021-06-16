import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/ticket';

@Component({
  selector: 'app-book-ticket-list',
  templateUrl: './book-ticket-list.component.html',
  styleUrls: ['./book-ticket-list.component.css']
})
export class BookTicketListComponent implements OnInit {
  optionSearch: any;
  keySearch = "";
  ticketBookedList: Ticket[] = [];
  cancelId: number;

  constructor() { }

  ngOnInit(): void {
    this.getBookTicketList();
  }

  getBookTicketList() {

  }

  search() {

  }

  cancelSuccess() {
    this.getBookTicketList();
  }
}
