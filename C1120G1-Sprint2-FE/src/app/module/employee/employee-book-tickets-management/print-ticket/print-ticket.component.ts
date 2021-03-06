import {AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';
import {ActivatedRoute} from '@angular/router';
// import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {RoomSeat} from '../../../../model/roomSeat';
import {MovieTicket} from '../../../../model/movieTicket';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css']
})
export class PrintTicketComponent implements OnInit {
  // @ViewChild('print', {static: false}) printTicket: ElementRef;

  public ticketPrint: Ticket;
  listChoseSeat: RoomSeat[] = [];
  movieTicket: MovieTicket;
  totalMoney: number;

  constructor(private bookTicketService: BookTicketsManagementService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let index = this.activatedRoute.snapshot.params['ticketId'];
    this.bookTicketService.printTicketByTicketId(index).subscribe(data => {
      this.ticketPrint = data;
    });
    if (this.bookTicketService.listChoseSeat.length != 0) {
      this.listChoseSeat = this.bookTicketService.listChoseSeat;
      this.movieTicket = this.bookTicketService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    }
  }

  getTotalMoney(listChoseSeat: RoomSeat[]) {
    let total: number = 0;
    for (let roomSeat of listChoseSeat) {
      if (roomSeat.seat.seatType.seatTypeId == 1) {
        total += this.movieTicket.ticketPrice;
      } else {
        total += this.movieTicket.ticketPrice * (4 / 3);
      }
    }
    return Math.round(total);
  }


  // makePDF() {
  //   let doc = new jsPDF('p', 'pt', 'a4');
  //   doc.setFont("courier");
  //   doc.html(this.printTicket.nativeElement,{
  //     callback: (pdf) => {
  //       doc.save("movie.pdf");
  //     }
  //   });
  // }


  makePDF() {
    let element = document.getElementById('print');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 190, imgHeight);
      doc.save("movie.pdf");
    });
  }

}
