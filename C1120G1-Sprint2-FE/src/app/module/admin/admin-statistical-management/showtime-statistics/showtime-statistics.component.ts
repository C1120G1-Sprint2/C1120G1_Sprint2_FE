import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showtime-statistics',
  templateUrl: './showtime-statistics.component.html',
  styleUrls: ['./showtime-statistics.component.css']
})
export class ShowtimeStatisticsComponent implements OnInit {

  basicData: any;
  basicOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Số vé (vé)',
          backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A'
          ],
          data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56]
        }
      ]
    };
    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#495057'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            precision: 0,
            fontColor: '#495057'
          }
        }]
      }
    };
  }

}
