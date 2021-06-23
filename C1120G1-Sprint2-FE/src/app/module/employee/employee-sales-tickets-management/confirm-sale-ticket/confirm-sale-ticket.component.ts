import {Component, Inject, OnInit} from '@angular/core';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {Seat} from '../../../../model/seat';
import {Location} from '@angular/common';
import {MovieTicket} from '../../../../model/movieTicket';
import {MemberTicketDTO} from '../../../../model/memberTicketDTO';


@Component({
  selector: 'app-confirm-sale-ticket',
  templateUrl: './confirm-sale-ticket.component.html',
  styleUrls: ['./confirm-sale-ticket.component.css']
})
export class ConfirmSaleTicketComponent implements OnInit {
  public listSeat: Seat[];
  public movieTicket: MovieTicket;

  constructor(private saleTicketService: SalesTicketsManagementService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.saleTicketService.listSeatCurrent.subscribe((data) => {
      this.listSeat = data;
      if (this.listSeat.length === 0) {
        this.location.back();
      }
    });
    this.saleTicketService.currentMovieTicket.subscribe((data) => {
      this.movieTicket = data;
    });
  }

  totalPriceTicket(listSeat: Seat[]) {
    let totalPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listSeat.length; i++) {
      if (this.listSeat[i].seatType.seatTypeId === 1) {
        // tslint:disable-next-line:radix
        totalPrice += parseInt(this.movieTicket.ticketPrice.toString());
      } else {
        // tslint:disable-next-line:radix
        totalPrice += parseInt(this.movieTicket.ticketPrice.toString()) * (4 / 3);
      }
    }
    return Math.floor(totalPrice);
  }

  priceTicket(seatTypeId: number) {
    if (seatTypeId === 2) {
      return Math.round(this.movieTicket.ticketPrice * (4 / 3));
    } else {
      return Math.round(this.movieTicket.ticketPrice);
    }
  }

  back() {
    this.location.back();
  }

  createTicket() {
    const ticketDTO: MemberTicketDTO = {
      ticketId: null,
      movieTicketId: this.movieTicket.movieTicketId,
      seatId: 0,
      userId: 1,
      timeCreate: '',
      ticketStatusId: 2
    };
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listSeat.length; i++) {
      ticketDTO.seatId = this.listSeat[i].seatId;
      this.saleTicketService.createTicket(ticketDTO).subscribe((data) => {
      });
    }
  }
}
