import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {MovieTicket} from '../../../../model/movieTicket';
import {RoomSeat} from '../../../../model/roomSeat';
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
    // tslint:disable-next-line:radix
    this.roomId = parseInt(this.route.snapshot.queryParamMap.get('roomId'));
    this.salesTicketsService.findMovieTicketById(this.movieTicketId).subscribe((data) => {
      this.movieTicket = data;
      if (this.movieTicket === null) {
        this.router.navigate(['/employee/sale/tickets']);
      }
    });
    this.salesTicketsService.showAllSeatByRoomId(this.roomId).subscribe((data) => {
      this.listSeat = data;
      if (this.listSeat === null) {
        this.router.navigate(['/employee/sale/tickets']);
      }
    });
  }

  continue() {
    if (this.listChoseSeat.length !== 0) {
    } else {
      this.toast.error('Bạn chưa chọn vé!', 'Lỗi!');
    }
  }


  chooseSeat(seat: Seat) {
    if (this.listChoseSeat.length < 6) {
      const seatStyle = document.getElementById(seat.row.rowName + seat.column.columnName);
      if (!this.listChoseSeat.includes(seat)) {
        seatStyle.style.backgroundColor = 'green';
        seatStyle.style.color = 'white';
        this.listChoseSeat.push(seat);
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
      this.toast.error('Bạn chỉ có thể chọn tối đa 6 vé!', 'Lỗi!');
    }
  }
}
