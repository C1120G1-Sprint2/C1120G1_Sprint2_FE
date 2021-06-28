import {Component, OnInit} from '@angular/core';
import {Seat} from '../../../../model/seat';
import {MovieTicket} from '../../../../model/movieTicket';
import {User} from '../../../../model/user';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Account} from "../../../../model/account";
import {Ward} from "../../../../model/ward";

@Component({
  selector: 'app-infor-sale-ticket',
  templateUrl: './infor-sale-ticket.component.html',
  styleUrls: ['./infor-sale-ticket.component.css']
})
export class InforSaleTicketComponent implements OnInit {
  public listSeat: Seat[];
  public movieTicket: MovieTicket;
  public user: User = null;

  constructor(private saleTicketService: SalesTicketsManagementService,
              private location: Location,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.saleTicketService.listSeatCurrent.subscribe((data) => {
      this.listSeat = data;
      if (this.listSeat.length === 0) {
        this.location.back();
      }
    });
    this.saleTicketService.currentUser.subscribe((data) => {
        this.user = data;
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
    this.router.navigateByUrl('/employee/sale/tickets');
  }
}
