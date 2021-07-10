import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {MovieTicket} from '../../../model/movieTicket';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {User} from '../../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoomSeat} from '../../../model/roomSeat';
import {PaypalDTO} from '../../../model/paypalDTO';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserNoAccountDTO} from "../../../model/userNoAccountDTO";

declare var paypal;

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
  userNoAccountDTO:UserNoAccountDTO;
  createUserForm:FormGroup;
  totalMoney: number;
  ticketName:string = "";
  paypalDTO:PaypalDTO;
  paymentId:string = '';
  payerId:string = '';

  constructor(private location: Location,
              private formBuilder:FormBuilder,
              private bookTicketsService: BookTicketsService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService) {
  }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  ngOnInit(): void {

    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser().user;
    }
    console.log("abc");
    console.log(this.user);
    this.createForm();

    if (this.bookTicketsService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketsService.listChoseSeat;
      console.log(this.listChoseSeat)
      this.movieTicket = this.bookTicketsService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
      this.ticketName = "";
      for(let roomSeat of this.listChoseSeat){
        this.ticketName += (roomSeat.seat.row.rowName+roomSeat.seat.column.columnName)+" ";
      }
    } else {
      this.location.back();
    }
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  createForm(){
  this.createUserForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.pattern(/^(\s)*([\p{Lu}]|[\p{Ll}]){2,}((\s)(([\p{Lu}]|[\p{Ll}]){2,}))+(\s*)$/u)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        idCard : new FormControl('', [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
        phone: new FormControl('', [Validators.required, Validators.pattern('(09|03)[0-9]{8}')])
      }
    );
  }

  confirmCreate() {
    if (this.user == null) {
      if (this.createUserForm.valid) {
        this.userNoAccountDTO = this.createUserForm.value;
        this.bookTicketsService.createUserNoAccount(this.userNoAccountDTO).subscribe(data => {
          this.user = data;
        });
      } else {
        this.toastrService.warning('Bạn nhập thông tin user không hợp lệ', 'Thông Báo', {timeOut: 2000})
      }
    }
    // this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
    //   paypal.Button.render({
    //     env: 'sandbox',
    //     client: {
    //       production: 'AZMtdrGrR6S5jAMvERXiK365UgLAaNievYYpexl6JnnjoULHkpCH86pCzW5xeB_zHRa0R0vZhSs7M86U',
    //       sandbox: 'AZMtdrGrR6S5jAMvERXiK365UgLAaNievYYpexl6JnnjoULHkpCH86pCzW5xeB_zHRa0R0vZhSs7M86U'
    //     },
    //     commit: true,
    //     payment: function (data, actions) {
    //       return actions.payment.create({
    //         payment: {
    //           transactions: [
    //             {
    //               amount: { total: '4.00', currency: 'USD' }
    //             }
    //           ]
    //         }
    //       })
    //     },
    //     onAuthorize: function(data, actions) {
    //       return actions.payment.execute().then( x => {
    //         console.log("PAYPAL : OK");
    //       })
    //     }
    //   }, '#paypal');
    // });
    this.createTicket();
  }

  createTicket():void {
    let flag: boolean = true;
    for (let roomSeat of this.listChoseSeat) {
      this.bookTicketsService.createTicketDTO(this.movieTicket.movieTicketId,
        this.user.userId, roomSeat.seat.seatId).subscribe(data => {
        console.log('OK ' + data);
      }, error => {
        console.log("get "+error+" at createTicketDTO() on ConfirmBookingComponent");
        flag = false;
      });
    }

    if (flag) {
      setTimeout(x => {
        this.toastrService.success("Bạn đã đặt vé thành công", "Thông báo!");
        this.router.navigateByUrl('booking/information').then();
        this.isConfirmed = true;
      }, 3000);
    } else {
      this.toastrService.warning('Đã có lỗi xảy ra!', 'Thông báo!');
    }
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
