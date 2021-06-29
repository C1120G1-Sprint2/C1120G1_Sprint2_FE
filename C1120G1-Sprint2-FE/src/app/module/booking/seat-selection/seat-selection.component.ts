import { Component, OnInit } from '@angular/core';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {Ticket} from '../../../model/ticket';
import {MovieTicket} from '../../../model/movieTicket';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomSeat} from '../../../model/roomSeat';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  listRow:number[] = [1,2,3,4,5,6,7];

  listSeat: RoomSeat[] = [];
  listChoseSeat: RoomSeat[] = [];
  ticket:Ticket;
  movieTicket:MovieTicket;
  movieTicketId:number;

  constructor(private bookTicketsService:BookTicketsService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.movieTicketId = parseInt(this.activatedRoute.snapshot.queryParamMap.get("movieTicketId"));

    this.bookTicketsService.getMovieTicketById(this.movieTicketId).subscribe(data => {
      this.movieTicket = data;
      this.bookTicketsService.movieTicket = this.movieTicket;
      this.getAllSeat(this.movieTicket.room.roomId);
    }, error => {
      console.log("get "+error+" at getMovieTicketById() on SeatSelectionComponent");
    })
  }

  getAllSeat(roomId:number){
    this.bookTicketsService.getAllSeat(roomId).subscribe(data => {
      this.listSeat = data;
    }, error =>  {
      console.log("get "+error+" at getAllSeat() on SeatSelectionComponent");
    })
  }

  chooseSeat(roomSeat: RoomSeat) {
    if (roomSeat.seatStatus.seatStatusId == 1) {
      const seatStyle = document.getElementById(roomSeat.seat.row.rowName + roomSeat.seat.column.columnName);
      if (!this.listChoseSeat.includes(roomSeat)) {
        if (this.listChoseSeat.length < 8) {
          seatStyle.style.backgroundColor = 'green';
          seatStyle.style.color = 'white';
          this.listChoseSeat.push(roomSeat);
        } else {
          this.toastrService.error('Bạn chỉ có thể chọn tối đa 8 vé!', 'Thông báo!');
        }
      } else {
        if (roomSeat.seat.seatType.seatTypeId === 2) {
          seatStyle.style.backgroundColor = 'lightpink';
        } else {
          seatStyle.style.backgroundColor = '#f0f0f0';
        }
        seatStyle.style.color = 'black';
        this.listChoseSeat.splice(this.listChoseSeat.indexOf(roomSeat), 1);
      }
    } else {
      this.toastrService.warning("Ghế này đã có người đặt rồi!","Thông báo!")
    }
  }

  continue() {
    if (this.listChoseSeat.length != 0 ){
      this.bookTicketsService.listChoseSeat = this.listChoseSeat;
      this.router.navigateByUrl("booking/confirm");
    } else {
      this.toastrService.error("Bạn chưa chọn vé!", "Lỗi!")
    }
  }
}
