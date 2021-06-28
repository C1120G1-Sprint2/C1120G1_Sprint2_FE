import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.scss']
})
export class BookingInformationComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }


}
