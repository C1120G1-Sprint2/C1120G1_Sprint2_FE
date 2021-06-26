import {Component, Inject, OnInit} from '@angular/core';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {Seat} from '../../../../model/seat';
import {Location} from '@angular/common';
import {MovieTicket} from '../../../../model/movieTicket';
import {MemberTicketDTO} from '../../../../model/memberTicketDTO';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../../model/user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-confirm-sale-ticket',
  templateUrl: './confirm-sale-ticket.component.html',
  styleUrls: ['./confirm-sale-ticket.component.css']
})
export class ConfirmSaleTicketComponent implements OnInit {
  public listSeat: Seat[];
  public movieTicket: MovieTicket;
  public listTicketDTO: MemberTicketDTO[] = [];
  public user: User = null;

  constructor(private saleTicketService: SalesTicketsManagementService,
              private location: Location,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.saleTicketService.listSeatCurrent.subscribe((data) => {
      this.listSeat = data;
      console.log(this.listSeat);
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
    this.location.back();
  }

  createTicket() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listSeat.length; i++) {
      const ticketDTO: MemberTicketDTO = {
        ticketId: null,
        movieTicketId: this.movieTicket.movieTicketId,
        seatId: this.listSeat[i].seatId,
        userId: this.user.userId,
        timeCreate: '',
        ticketStatusId: 2
      };
      this.listTicketDTO.push(ticketDTO);
    }
    this.saleTicketService.createTicket(this.movieTicket.room.roomId, this.listTicketDTO).subscribe((data) => {
      this.saleTicketService.changeListChoseSeat(this.listSeat);
      this.saleTicketService.changeUser(this.user);
      this.saleTicketService.changeMovieTicket(this.movieTicket);
    });
    this.router.navigateByUrl('/employee/sale/tickets/info');
  }
}
