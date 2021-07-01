import { Component, OnInit } from '@angular/core';
import {RoomSeat} from '../../../model/roomSeat';
import {MovieTicket} from '../../../model/movieTicket';
import {User} from '../../../model/user';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.scss']
})
export class BookingInformationComponent implements OnInit {

  isConfirmed: boolean = false;
  listChoseSeat: RoomSeat[] = [];
  movieTicket: MovieTicket;
  user: User;
  totalMoney: number;

  constructor(private bookTicketsService: BookTicketsService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().user;

    if (this.bookTicketsService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketsService.listChoseSeat;
      this.movieTicket = this.bookTicketsService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    }
  }

  getTotalMoney(listChoseSeat: RoomSeat[]) {
    let total: number = 0;
    for (let roomSeat of listChoseSeat) {
      if (roomSeat.seat.seatType.seatTypeId == 1) {
        total += parseInt(this.movieTicket.ticketPrice.toString());
      } else {
        total += parseInt(this.movieTicket.ticketPrice.toString()) * (4 / 3);
      }
    }
    return Math.round(total);
  }


}
