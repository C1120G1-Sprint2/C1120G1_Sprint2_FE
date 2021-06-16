import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  counter(number: number) {
    return new Array(number)
  }

  changeColor(x: number, y: number) {
    console.log(x);
    console.log(y);
    let seat = document.getElementById(x.toString() + y.toString());
    console.log(x.toString() + y.toString());
    if (seat != null) {
      document.getElementById(x.toString() + y.toString()).style.backgroundColor = 'green';
    }

  }

}
