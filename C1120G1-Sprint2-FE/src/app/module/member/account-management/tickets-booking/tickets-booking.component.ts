import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookTicketsService} from "../../../../service/member/book-tickets/book-tickets.service";
import {Ticket} from "../../../../model/ticket";

@Component({
  selector: 'app-tickets-booking',
  templateUrl: './tickets-booking.component.html',
  styleUrls: ['./tickets-booking.component.css']
})
export class TicketsBookingComponent implements OnInit {

  constructor(private bookTicketsService: BookTicketsService,
              private activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ticketBooking: Ticket[]=[];
  username: string = 'hoangsang123';
  deleteId: number;
  deleteTitle: string;


  ngOnInit(): void {
    // this.username = this.activatedRoute.snapshot.params["hoangsang123"];
    this.bookTicketsService.findAll(this.username).subscribe(data=>{
      this.ticketBooking=data;
      console.log(data);
    })
  }

  deleteSuccess() {
    this.ngOnInit();
  }
}
