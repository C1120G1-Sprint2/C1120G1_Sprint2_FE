import {Component, Input, OnInit} from '@angular/core';
import {MovieTicket} from '../../../model/movieTicket';
import {TicketPriceService} from '../../../service/ticket-price-client/ticket-price.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-price-ticket-client',
  templateUrl: './price-ticket-client.component.html',
  styleUrls: ['./price-ticket-client.component.css']
})
export class PriceTicketClientComponent implements OnInit {
  showDate:string;
  movietickets: MovieTicket[] = [];
  constructor(private ticketClientService: TicketPriceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onChangDate();
  }


  change() {
    document.getElementById("side-a").style.display = "block";
    document.getElementById("side-b").style.display = "none";
  }

  change2() {
    document.getElementById("side-b").style.display ="block";
    document.getElementById("side-a").style.display = "none";
  }

  onChangDate() {
    console.log(typeof this.showDate);
    this.ticketClientService.getAllMovieByDate(this.showDate).subscribe(data => {
      this.movietickets = data;
      console.log(data);
      this.toastr.success("Find successfully", "Notification");
      console.log(data);
    }, error => {
      this.toastr.error("Not Found", "Notification");
    })
  }
}
