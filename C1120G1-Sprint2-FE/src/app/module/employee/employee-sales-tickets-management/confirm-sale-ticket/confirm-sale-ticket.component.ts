import {Component, Inject, OnInit} from '@angular/core';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {Seat} from '../../../../model/seat';
import {Location} from '@angular/common';
import {MovieTicket} from '../../../../model/movieTicket';
import {MemberTicketDTO} from '../../../../model/memberTicketDTO';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../../model/user';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../model/account";
import {Ward} from "../../../../model/ward";


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
  public createTicketUserNoAccount = new FormGroup(
    {
      userId: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.pattern(/^(\s)*([\p{Lu}]|[\p{Ll}]){2,}((\s)(([\p{Lu}]|[\p{Ll}]){2,}))+(\s*)$/u)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('(09|03)[0-9]{8}')])
    }
  );

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
      if (data !== null) {
        this.user = data;
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
    const user: User = {
      userId: null,
      name: this.createTicketUserNoAccount.value.name,
      birthday: null,
      gender: null,
      email: this.createTicketUserNoAccount.value.email,
      phone: this.createTicketUserNoAccount.value.phone,
      idCard: null,
      avatarUrl: null,
      account: null,
      ward: null,
    };
    this.saleTicketService.createUserNoAccount(user).subscribe((data) => {
      this.user = data;
      if (this.createTicketUserNoAccount.valid) {
        if (this.user !== null) {
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
          this.toast.success('Xác Nhận Bán Vé Thành Công!', 'Thông Báo', {timeOut: 2000})
        }
      } else {
        this.toast.warning('Bạn nhập thông tin user không hợp lệ', 'Thông Báo', {timeOut: 2000})
      }
    });
  }

  get name() {
    return this.createTicketUserNoAccount.get('name')
  }

  get email() {
    return this.createTicketUserNoAccount.get('email')
  }

  get phone() {
    return this.createTicketUserNoAccount.get('phone')
  }
}
