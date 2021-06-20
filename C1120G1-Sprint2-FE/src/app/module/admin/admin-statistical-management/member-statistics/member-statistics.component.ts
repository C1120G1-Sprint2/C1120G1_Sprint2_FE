import { Component, OnInit } from '@angular/core';
import { StatisticalManagementService } from 'src/app/service/admin/statistical-management/statistical-management.service';

@Component({
  selector: 'app-member-statistics',
  templateUrl: './member-statistics.component.html',
  styleUrls: ['./member-statistics.component.css']
})
export class MemberStatisticsComponent implements OnInit {

  multiAxisData: any;
  multiAxisOptions: any;
  memberTop: number = 5;
  chartHide: boolean = false;

  constructor(private _statisticalService: StatisticalManagementService) { }

  ngOnInit(): void {
    this.onMemberTop();
  }

  onMemberTop() {
    this._statisticalService.getTopMember(this.memberTop).subscribe(data => {
      this.initData();
      if (data != null) {
        for (let item of data) {
          this.multiAxisData.labels.push(item.name);
          this.multiAxisData.datasets[0].data.push(item.totalMoney);
          this.multiAxisData.datasets[1].data.push(item.point);
        }
        this.chartHide = false;
      } else {
        this.chartHide = true;
      }
    })
    this.initMultiAxisOptions();
    console.log(this.memberTop);
  }

  initData() {
    this.multiAxisData = {
      labels: [],
      datasets: [{
        label: 'Tổng tiền (VND)',
        backgroundColor: '#EC407A',
        yAxisID: 'y-axis-1',
        data: []
      }, {
        label: 'Điểm tích lũy (điểm)',
        backgroundColor: '#78909C',
        yAxisID: 'y-axis-2',
        data: []
      }]
    };
  }

  initMultiAxisOptions() {
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
