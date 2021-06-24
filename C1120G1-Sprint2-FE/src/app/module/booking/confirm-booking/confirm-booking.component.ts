import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Seat} from '../../../model/seat';
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
    // this.user = this.tokenStorageService.getUser();
    this.user = {
      userId: 1,
      name: 'Tran Quoc Hung',
      email: 'roflovidle@gmail.com',
      idCard: '205668551',
      phone: '0905223651',
      gender: 1,
      account: {
        username: 'hungtran123',
        password: '$2y$12$VUGca2AknkSCRkYByHb/Y.KEcy6eUl.rpxLIOnp34KwmJYb1q9qJ.',
        accountStatus: {
          accountStatusId: 2,
          accountStatusName: 'Đang hoạt động'
        },
        point: '0',
        registerDay: '2021-02-05'
      },
      ward: {
        wardId: 3,
        wardName: 'La Thành',
        district: {
          districtId: 3,
          districtName: 'Hoàn Kiếm',
          province: {
            provinceId: 1,
            provinceName: 'Hà Nội'
          }
        }
      },
      birthday: '1995-06-18',
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/login%2Fuser.jpg?alt=media&token=d3149a38-f6f3-42d2-b8bf-b79d78049b89'
    };
    if (this.bookTicketsService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketsService.listChoseSeat;
      this.movieTicket = this.bookTicketsService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    } else {
      this.location.back();
    }
  }

  confirm() {
    this.bookTicketsService.payViaPaypal(this.totalMoney).subscribe(data => {
      if (data) {
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
          this.router.navigateByUrl('login').then();
          this.isConfirmed = true;
        } else {
          this.toastrService.warning('Đã có lỗi xảy ra!', 'Thông báo!');
        }
      } else {
        this.toastrService.warning('Đã có lỗi xảy ra trong quá trình giao dịch!', 'Thông báo!');
      }
    }, error => {
      // this.router.navigateByUrl("/login").then();
      console.log('get ' + error + ' at payViaPaypal() on ConfirmBookingComponent');
    });
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
