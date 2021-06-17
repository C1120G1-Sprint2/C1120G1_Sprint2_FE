import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit {

  isConfirmed:boolean = false;
  listChoseSeat: string[] = ["A3", "A4", "A5", "A6"];

  constructor() { }

  ngOnInit(): void {
  }

  confirm() {
    this.isConfirmed = true;
  }

}
