import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {BookTicketsService} from '../../../../service/member/book-tickets/book-tickets.service';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';

@Component({
  selector: 'app-book-ticket-list',
  templateUrl: './book-ticket-list.component.html',
  styleUrls: ['./book-ticket-list.component.css']
})
export class BookTicketListComponent implements OnInit {
  optionSearch = 1;
  keySearch: any;
  bookedTicketList: Ticket[] = [];
  cancelId: number;
  ticketCheck: Ticket;

  constructor(private bookTicketManagementService: BookTicketsManagementService) { }

  ngOnInit(): void {
    this.getBookTicketList();
  }

  getBookTicketList() {
    this.bookTicketManagementService.getAllBookedTicketList().subscribe(data => {
      this.bookedTicketList = data.content;
    });
  }

  search() {
    if (this.optionSearch == 1) {
      this.bookTicketManagementService.searchTicketByTicketId(this.keySearch).subscribe(data => {
        this.bookedTicketList  = data.content;
      });
    } else if (this.optionSearch == 2) {
      this.bookTicketManagementService.searchTicketByUserId(this.keySearch).subscribe(data => {
        this.bookedTicketList  = data.content;
      });
    } else if (this.optionSearch == 3) {
      this.bookTicketManagementService.searchTicketByIdCard(this.keySearch).subscribe(data => {
        this.bookedTicketList  = data.content;
      });
    } else {
      this.bookTicketManagementService.searchTicketByPhone(this.keySearch).subscribe(data => {
        this.bookedTicketList  = data.content;
      });
    }
  }

  cancelSuccess() {
    this.getBookTicketList();
  }
}
