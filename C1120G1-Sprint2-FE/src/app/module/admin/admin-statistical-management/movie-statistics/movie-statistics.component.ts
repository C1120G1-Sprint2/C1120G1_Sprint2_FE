import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StatisticalManagementService } from 'src/app/service/admin/statistical-management/statistical-management.service';

@Component({
  selector: 'app-movie-statistics',
  templateUrl: './movie-statistics.component.html',
  styleUrls: ['./movie-statistics.component.css']
})
export class MovieStatisticsComponent implements OnInit {

  multiAxisData: any;
  multiAxisOptions: any;
  statBy: string = 'ngay';
  startDate: string = '';
  endDate: string = '';
  month: number = 1;
  year: number = 2021;

  constructor(private _statisticalService: StatisticalManagementService) { }

  ngOnInit(): void {
    
  }

  onStatByDate() {
    this._statisticalService.getMovieStatisticsByDate(this.startDate, this.endDate).subscribe(data => {
      this.multiAxisData = {
        labels: [],
        datasets: [{
          label: 'Doanh thu (VND)',
          backgroundColor: '#42A5F5',
          yAxisID: 'y-axis-1',
          data: []
        }, {
          label: 'Số vé (Vé)',
          backgroundColor: '#FFA726',
          yAxisID: 'y-axis-2',
          data: []
        }]
      };

      for (let item of data) {
        this.multiAxisData.labels.push(moment(item.createDate).format('DD/MM/yyyy'));
        this.multiAxisData.datasets[0].data.push(item.revenue);
        this.multiAxisData.datasets[1].data.push(item.ticketQuantity);
      }
    })

    this.multiAxisOptions = {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: true
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            min: 0,
            precision: 0
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            min: 0,
            precision: 0
          }
        }]
      }
    };
  }

  onStatByMonth() {
    this._statisticalService.getMovieStatisticsByMonth(this.month, this.year).subscribe(data => {
      this.multiAxisData = {
        labels: [],
        datasets: [{
          label: 'Doanh thu (VND)',
          backgroundColor: '#42A5F5',
          yAxisID: 'y-axis-1',
          data: []
        }, {
          label: 'Số vé (Vé)',
          backgroundColor: '#FFA726',
          yAxisID: 'y-axis-2',
          data: []
        }]
      };

      for (let i = 1; i < 31; i++) {
        this.multiAxisData.labels.push(i);
        this.multiAxisData.datasets[0].data.push(0);
        this.multiAxisData.datasets[1].data.push(0);
        for (let j = 0; j < data.length; j++) {
          if (parseInt(data[j].createDate.substring(8, 10)) === i) {
            this.multiAxisData.datasets[0].data[i - 1] = data[j].revenue;
            this.multiAxisData.datasets[1].data[i - 1] = data[j].ticketQuantity;
          }
        }
      }
      console.log(this.multiAxisData);
    })

    this.multiAxisOptions = {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: true
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            min: 0,
            precision: 0
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            min: 0,
            precision: 0
          }
        }]
      }
    };
  }

  onStatByYear() {
    this._statisticalService.getMovieStatisticsByYear(this.year).subscribe(data => {
      this.multiAxisData = {
        labels: [],
        datasets: [{
          label: 'Doanh thu (VND)',
          backgroundColor: '#42A5F5',
          yAxisID: 'y-axis-1',
          data: []
        }, {
          label: 'Số vé (Vé)',
          backgroundColor: '#FFA726',
          yAxisID: 'y-axis-2',
          data: []
        }]
      };

      for (let item of data) {
        this.multiAxisData.labels.push("1");
        this.multiAxisData.datasets[0].data.push(item.revenue);
        this.multiAxisData.datasets[1].data.push(item.ticketQuantity);
      }
    })

    this.multiAxisOptions = {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: true
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            min: 0,
            precision: 0
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            min: 0,
            precision: 0
          }
        }]
      }
    };
  }

}
