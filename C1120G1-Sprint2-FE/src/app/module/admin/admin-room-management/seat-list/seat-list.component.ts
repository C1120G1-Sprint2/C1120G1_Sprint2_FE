import {Component, OnInit} from '@angular/core';
import {Row} from '../../../../model/row';
import {Columns} from '../../../../model/columns';
import {Seat} from '../../../../model/seat';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {


  public rowList: Row[] = [
    new Row(1, 'A'),
    new Row(2, 'B'),
    new Row(3, 'C'),
    new Row(4, 'D'),
    new Row(5, 'E'),
    new Row(6, 'F'),
    new Row(7, 'G'),
  ];

  public columnList: Columns[] = [
    new Columns(1, '1'),
    new Columns(2, '2'),
    new Columns(3, '3'),
    new Columns(4, '4'),
    new Columns(5, '5'),
    new Columns(6, '6'),
    new Columns(7, '7'),
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

  changeColor(x: number, y: number) {
    console.log(x);
    console.log(y);
    let row = document.getElementById(x.toString());
    let col = document.getElementById(y.toString());
    console.log(row);
  }

}

