import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {MovieTicket} from '../../../../model/movieTicket';
import {ToastrService} from 'ngx-toastr';
import {Seat} from '../../../../model/seat';
import {RoomSeat} from '../../../../model/roomSeat';
import {MatDialog} from '@angular/material/dialog';
import {LoadingComponent} from '../../../loading/loading.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
@Component({
  selector: 'app-select-seat',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  public movieTicketId: number;
  public formSearchCardId;
  public movieTicket: MovieTicket;
  public listRoomSeat: RoomSeat[];
  public listChoseSeat: Seat[] = [];
  public listRow: number[] = [1, 2, 3, 4, 5, 6, 7];
  public user: User = null;
  constructor(private salesTicketsService: SalesTicketsManagementService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastrService,
              private dialog: MatDialog,
              private modal: NgbModal) {
  }
  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.movieTicketId = parseInt(this.route.snapshot.queryParamMap.get('movieTicketId'));
    this.salesTicketsService.findMovieTicketById(this.movieTicketId).subscribe((data) => {
      this.movieTicket = data;
      if (this.movieTicket === null) {
        this.router.navigate(['/employee/sale/tickets']);
      } else {
        this.salesTicketsService.showAllSeatByRoomId(this.movieTicket.room.roomId).subscribe((data1) => {
          this.listRoomSeat = data1;
        });
      }
    });
    this.formSearchCardId = new FormGroup(
      {username: new FormControl('', [Validators.required, Validators.pattern('\\w{6,}')])}
    );
  }
  openLoading() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });
  }
  continue() {
    this.user === null;
    this.salesTicketsService.changeUser(this.user);
    this.salesTicketsService.changeListChoseSeat(this.listChoseSeat);
    this.salesTicketsService.changeMovieTicket(this.movieTicket);
    this.router.navigateByUrl('/employee/sale/tickets/confirmSaleTicket');
  }
  chooseSeat(roomSeat: RoomSeat) {
    const seatStyle = document.getElementById(roomSeat.seat.row.rowName + roomSeat.seat.column.columnName);
    if (roomSeat.seatStatus.seatStatusId === 1) {
      if (!this.listChoseSeat.includes(roomSeat.seat)) {
        if (this.listChoseSeat.length < 8) {
          seatStyle.style.backgroundColor = 'green';
          seatStyle.style.color = 'white';
          this.listChoseSeat.push(roomSeat.seat);
        } else {
          this.toast.error('B???n ch??? c?? th??? ch???n t??? 1 ?????n 8 v?? !', 'L???i!');
        }
      } else {
        if (roomSeat.seat.seatType.seatTypeId === 2) {
          seatStyle.style.backgroundColor = 'lightpink';
        } else {
          seatStyle.style.backgroundColor = '#f0f0f0';
        }
        seatStyle.style.color = 'black';
        this.listChoseSeat.splice(this.listChoseSeat.indexOf(roomSeat.seat), 1);
      }
    } else {
      this.toast.warning('Gh??? n??y ???? c?? ng?????i ?????t', 'Th??ng B??o');
    }
  }
  checkSeatClass(roomSeat: RoomSeat) {
    if (roomSeat.seatStatus.seatStatusId === 1) {
      if (roomSeat.seat.seatType.seatTypeId === 1) {
        return 'empty-seat';
      } else {
        return 'vip-seat';
      }
    } else {
      return 'ordered-seat';
    }
  }
  openCheckAccount(content) {
    this.modal.open(content, {windowClass: 'dark-modal'});
  }
  checkAccount() {
    if (this.formSearchCardId.invalid) {
      this.toast.warning('Th??ng tin b???n nh???p kh??ng h???p l???, card id ph???i l?? s??? v?? g???m 9 k?? t???!', 'Th??ng B??o', {timeOut: 3000});
    } else {
      this.salesTicketsService.findUserByUserName(this.formSearchCardId.value.username).subscribe((data) => {
        this.user = data;
        if (this.user === null) {
          this.toast.warning('Kh??ng t??m th???y t??i kho???n', 'Th??ng B??o', {timeOut: 2000});
        } else {
          this.toast.success('???? t??m th???y t??i kho???n', 'Th??ng B??o', {timeOut: 2000})
        }
      });
    }
  }
  changeUser() {
    this.salesTicketsService.changeUser(this.user);
    this.salesTicketsService.changeListChoseSeat(this.listChoseSeat);
    this.salesTicketsService.changeMovieTicket(this.movieTicket);
    this.router.navigateByUrl('/employee/sale/tickets/confirmSaleTicket');
  }
  totalPriceTicket(listSeat: Seat[]) {
    let totalPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listSeat.length; i++) {
      if (listSeat[i].seatType.seatTypeId === 1) {
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
}
