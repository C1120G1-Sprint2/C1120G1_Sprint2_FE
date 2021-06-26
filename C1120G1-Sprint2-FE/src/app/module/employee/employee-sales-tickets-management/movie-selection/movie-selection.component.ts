import {Component, OnInit} from '@angular/core';
import {MovieTicket} from '../../../../model/movieTicket';
import {SalesTicketsManagementService} from '../../../../service/employee/sales-tickets-management/sales-tickets-management.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-movie',
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.css']
})
export class MovieSelectionComponent implements OnInit {
  public listMovie: MovieTicket[];
  public listShowTime: MovieTicket[] = null;
  public listShowDate: MovieTicket[] = null;
  public movieId: number = null;
  public showDate: string = null;
  public showTimeId: number = null;
  public movieTicket: MovieTicket;
  public activeId = null;

  constructor(private saleTicketService: SalesTicketsManagementService,
              private toast: ToastrService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.saleTicketService.showAllMovieTicket().subscribe((data) => {
      this.listMovie = data;
    });
  }

  changeShowDate(movieId: number) {
    this.activeId = movieId;
    this.listShowTime = null;
    this.movieId = movieId;
    this.showDate = null;
    this.showTimeId = null;
    this.saleTicketService.showAllMovieTicketByMovieId(movieId).subscribe((data) => {
      this.listShowDate = data;
    });
  }

  changeShowTime(showDate: string) {
    this.showDate = showDate;
    this.showTimeId = null;
    this.saleTicketService.showAllMovieTicketByIdAndShowDate(this.movieId, showDate).subscribe((data) => {
      this.listShowTime = data;
    });
  }

  changeShowTimeId(showTimeId: number) {
    this.showTimeId = showTimeId;
  }

  checkMovieTicket() {
    if (this.movieId !== null && this.showDate !== null && this.showTimeId !== null) {
      this.saleTicketService.findMovieTicketBySelect(this.movieId, this.showDate, this.showTimeId).subscribe((data) => {
        this.movieTicket = data;
        this.route.navigate(['employee/sale/tickets/seat'], {
            queryParams: {
              movieTicketId: this.movieTicket.movieTicketId
            }
          }
        );
      });
    } else {
      this.toast.warning('Bạn chưa chọn đầy đủ thông tin để tiếp tục', 'Thông Báo', {timeOut: 2000});
    }
  }
}
