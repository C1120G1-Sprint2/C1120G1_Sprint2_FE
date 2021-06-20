import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-seat',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {

  listCol: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  listRow: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  seatNumber: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  chooseSeat(col: string, row: string) {
    const seat = col + row;
    let color = document.getElementById(seat).style.color;

    if (this.seatNumber > 0) {
      if (color === 'gray' || color === 'purple') {
        color = 'green';
        this.seatNumber--;
      } else if (color === 'green') {
        color = 'gray';
        this.seatNumber++;
      }
    } else if (this.seatNumber === 0 && color === 'green') {
      color = 'gray';
      this.seatNumber++;
    }
    document.getElementById(seat).style.color = color;
  }


}
