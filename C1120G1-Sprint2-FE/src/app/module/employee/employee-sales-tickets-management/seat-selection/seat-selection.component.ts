import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {MovieTicket} from '../../../../model/movieTicket';
import {ToastrService} from 'ngx-toastr';
import {Seat} from '../../../../model/seat';

@Component({
  selector: 'app-select-seat',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  public movieTicketId: number;
  public roomId: number;
  public movieTicket: MovieTicket;
  public listSeat: Seat[];
  public listChoseSeat: Seat[] = [];
  public listRow: number[] = [1, 2, 3, 4, 5, 6, 7];


  constructor(private salesTicketsService: SalesTicketsManagementService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastrService) {
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
          this.listSeat = data1;
        });
      }
    });
  }

  continue() {
    if (this.listChoseSeat.length !== 0) {
      this.salesTicketsService.changeListChoseSeat(this.listChoseSeat);
      this.salesTicketsService.changeMovieTicket(this.movieTicket);
      this.router.navigateByUrl('/employee/sale/tickets/confirmSaleTicket');
    } else {
      this.toast.error('Bạn chưa chọn vé!', 'Lỗi!');
    }
  }


  chooseSeat(seat: Seat) {
    const seatStyle = document.getElementById(seat.row.rowName + seat.column.columnName);
    if (seat.seatStatus.seatStatusId === 1) {
      if (!this.listChoseSeat.includes(seat)) {
        if (this.listChoseSeat.length < 8) {
          seatStyle.style.backgroundColor = 'green';
          seatStyle.style.color = 'white';
          this.listChoseSeat.push(seat);
        } else {
          this.toast.error('Bạn chỉ có thể chọn từ 1 đến 8 vé !', 'Lỗi!');
        }
      } else {
        if (seat.seatType.seatTypeId === 2) {
          seatStyle.style.backgroundColor = 'lightpink';
        } else {
          seatStyle.style.backgroundColor = '#f0f0f0';
        }
        seatStyle.style.color = 'black';
        this.listChoseSeat.splice(this.listChoseSeat.indexOf(seat), 1);
      }
    } else {
      this.toast.warning('Ghế này đã có người đặt', 'Thông Báo');
    }
  }
  checkSeatClass(seat: Seat) {
    if (seat.seatStatus.seatStatusId === 1){
      if (seat.seatType.seatTypeId === 1){
        return 'empty-seat';
      }else {
        return  'vip-seat';
      }
    }else {
      return 'ordered-seat';
    }
  }
}
