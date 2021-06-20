import { Component, OnInit } from '@angular/core';
import { StatisticalManagementService } from 'src/app/service/admin/statistical-management/statistical-management.service';

@Component({
  selector: 'app-showtime-statistics',
  templateUrl: './showtime-statistics.component.html',
  styleUrls: ['./showtime-statistics.component.css']
})
export class ShowtimeStatisticsComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  showtimeTop: number = 5;
  chartHide: boolean = false;

  constructor(private _statisticalService: StatisticalManagementService) { }

  ngOnInit(): void {
    this.onShowtimeTop();
  }

  onShowtimeTop() {
    this._statisticalService.getTopShowtime(this.showtimeTop).subscribe(data => {
      this.initData();
      if (data != null) {
        for (let item of data) {
          const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
          this.basicData.labels.push(item.showtime);
          this.basicData.datasets[0].backgroundColor.push(randomColor);
          this.basicData.datasets[0].data.push(item.ticketQuantity);
        }
        this.chartHide = false;
      } else {
        this.chartHide = true;
      }
    })
    this.initBasicOptions();
  }

  initData() {
    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'Số vé (Vé)',
          backgroundColor: [],
          data: [],
        }
      ]
    };
  }

  initBasicOptions() {
    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#495057'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            precision: 0,
            fontColor: '#495057',
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#495057'
          },
          barPercentage: 0.7
        }]
      }
    };
  }

}
