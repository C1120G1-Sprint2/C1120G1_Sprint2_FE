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
  totalMoney: number;
  ticketName:string = "";
  paypalDTO:PaypalDTO;
  paymentId:string = '';
  payerId:string = '';

  constructor(private location: Location,
              private bookTicketsService: BookTicketsService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService) {
  }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().user;

    if (this.bookTicketsService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketsService.listChoseSeat;
      this.movieTicket = this.bookTicketsService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    } else {
      this.location.back();
    }

    // paypal.Buttons(
    //   {
    //     style: {
    //       shape: 'rect',
    //       color: 'gold',
    //       layout: 'horizontal',
    //       label: 'paypal',
    //       tagline: true,
    //       height: 50
    //       // color:  'blue',
    //       // shape:  'pill',
    //       // label:  'pay',
    //       // height: 40
    //     },
    //     createOrder: (data, actions) => {
    //       console.log('createOrder');
    //       // This function sets up the details of the transaction,
    //       // including the amount and line item details
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: 5.0, //test
    //               currency_code: 'USD'
    //             }
    //           }
    //         ]
    //       });
    //     },
    //     onApprove: (data, actions) => {
    //       return actions.order.capture().then(details => {
    //         console.log('Transaction completed');
    //         console.log(details);
    //         this.createTicket();
    //       });
    //     },
    //     onError: (data, actions) => {
    //       console.log('Transaction error');
    //       // @ts-ignore
    //       $('#refreshData').click();
    //     }
    //
    //   }
    // ).render(this.paypalElement.nativeElement);
    // this.bookTicketsService.paySuccess(this.paymentId, )
  }

  confirmCreate() {
    this.ticketName = "";
    for(let roomSeat of this.listChoseSeat){
      this.ticketName += (roomSeat.seat.row.rowName+roomSeat.seat.column.columnName)+" ";
    }
    if (confirm("Bạn xác nhận sẽ đặt "+this.listChoseSeat.length+" vé : "+this.ticketName+"?")){
      this.paypalDTO = new PaypalDTO(Math.round(Math.floor(this.totalMoney / 23000)));
      console.log(this.paypalDTO)
      // this.bookTicketsService.payViaPaypal(this.paypalDTO).subscribe(data => {
      //   console.log(data['linkName']);
        this.createTicket();
      //   // window.open(data['linkName'], "_self");
      //   // this.paymentId = this.activatedRoute.snapshot.params['paymentId'];
      //   // this.payerId = this.activatedRoute.snapshot.params['PayerID'];
      //   // console.log(this.paymentId)
      //   // console.log(this.payerId)
      //   // this.bookTicketsService.paySuccess(this.paymentId, this.payerId).subscribe(data => {
      //   //
      //   // })
      // });
      this.isConfirmed = true;
    }
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
