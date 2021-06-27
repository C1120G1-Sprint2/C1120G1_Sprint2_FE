import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {MovieTicket} from '../../../model/movieTicket';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {User} from '../../../model/user';
import {MemberTicketDTO} from '../../../model/memberTicketDTO';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoomSeat} from '../../../model/roomSeat';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit {

  isConfirmed: boolean = false;
  listChoseSeat: RoomSeat[] = [];
  movieTicket: MovieTicket;
  user: User;
  totalMoney: number;
  ticketDTO: MemberTicketDTO;

  constructor(private location: Location,
              private bookTicketsService: BookTicketsService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().user;

    if (this.bookTicketsService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketsService.listChoseSeat;
      this.movieTicket = this.bookTicketsService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    } else {
      this.location.back();
    }
  }

  confirm() {

    let flag: boolean = true;
    for (let roomSeat of this.listChoseSeat) {
      this.ticketDTO = new MemberTicketDTO(this.movieTicket.movieTicketId,
        this.user.userId, roomSeat.seat.seatId);
      console.log(this.ticketDTO);

      this.bookTicketsService.createTicketDTO(this.movieTicket.movieTicketId,
        this.user.userId, roomSeat.seat.seatId).subscribe(data => {
        console.log('OK ' + data);
      }, error => {
        console.log("get "+error+" at createTicketDTO() on ConfirmBookingComponent");
        flag = false;
      });

    }
    if (flag) {
      this.router.navigateByUrl('booking/information').then();
      this.isConfirmed = true;
    } else {
      this.toastrService.warning('Đã có lỗi xảy ra!', 'Thông báo!');
    }

    // this.bookTicketsService.payViaPaypal(this.totalMoney).subscribe(data => {
    //     let flag: boolean = true;
    //     for (let roomSeat of this.listChoseSeat) {
    //       this.ticketDTO = new MemberTicketDTO(this.movieTicket.movieTicketId,
    //         this.user.userId, roomSeat.seat.seatId);
    //       console.log(this.ticketDTO);
    //
    //       this.bookTicketsService.createTicketDTO(this.movieTicket.movieTicketId,
    //         this.user.userId, roomSeat.seat.seatId).subscribe(data => {
    //         console.log('OK ' + data);
    //       }, error => {
    //         console.log("get "+error+" at createTicketDTO() on ConfirmBookingComponent");
    //         flag = false;
    //       });
    //
    //     }
    //     if (flag) {
    //       this.router.navigateByUrl('booking/information').then();
    //       this.isConfirmed = true;
    //     } else {
    //       this.toastrService.warning('Đã có lỗi xảy ra!', 'Thông báo!');
    //     }
    // }, error => {
    //   // this.router.navigateByUrl("/login").then();
    //   console.log('get ' + error + ' at payViaPaypal() on ConfirmBookingComponent');
    // });
  }

  back() {
    this.location.back();
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
