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
          this.toast.error('Bạn chỉ có thể chọn từ 1 đến 8 vé !', 'Lỗi!');
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
      this.toast.warning('Ghế này đã có người đặt', 'Thông Báo');
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
      this.toast.warning('Thông tin bạn nhập không hợp lệ, card id phải là số và gồm 9 kí tự!', 'Thông Báo', {timeOut: 3000});
    } else {
      this.salesTicketsService.findUserByUserName(this.formSearchCardId.value.username).subscribe((data) => {
        this.user = data;
        if (this.user === null) {
          this.toast.warning('Không tìm thấy tài khoản', 'Thông Báo', {timeOut: 2000});
        } else {
          this.toast.success('Đã tìm thấy tài khoản', 'Thông Báo', {timeOut: 2000})
        }
      });
    }
  }

  changeUser() {
    this.salesTicketsService.changeUser(this.user);
    this.continue();
  }
}
