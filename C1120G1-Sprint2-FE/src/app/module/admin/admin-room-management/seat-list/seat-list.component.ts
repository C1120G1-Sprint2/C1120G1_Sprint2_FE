import {Component, OnInit} from '@angular/core';
import {Row} from '../../../../model/row';
import {Columns} from '../../../../model/columns';
import {Seat} from '../../../../model/seat';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';
import {ToastrService} from 'ngx-toastr';
import {SeatType} from '../../../../model/seatType';
import {Room} from '../../../../model/room';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {

  rowList: Row[] = [];
  columnList: Columns[] = [];
  seat: Seat;
  seatTypeList: SeatType[];
  seatList : Seat[];
  arrayListSeat = [];
  roomId;
  roomDetail: Room;

  constructor(private roomManagement: RoomManagementService,
              private toast: ToastrService,
              private active: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getDataColumn();
    this.getDataRow();
    this.getDataSeatType();
    this.getDataSeat();

    this.active.paramMap.subscribe((data: ParamMap) => {
      this.roomId = data.get('id');
      this.roomManagement.getRoomById(this.roomId).subscribe((data: Room) => {
        if (data === null) {
          this.toast.warning('Dữ liệu không có', 'Thông báo');
        } else {
          this.roomDetail = data;
        }
      });
    });
  }

  getDataRow() {
    this.roomManagement.getAllRow().subscribe(data => {
      this.rowList = data;
      if (this.rowList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
      }
    });
  }

  getDataColumn() {
    this.roomManagement.getAllColumn().subscribe(data => {
      this.columnList = data;
      if (this.columnList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
      }
    });
  }

  getDataSeatType(){
    this.roomManagement.getAllSeatType().subscribe(data =>{
      this.seatTypeList = data;
      if (this.seatTypeList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
      }
      console.log(this.seatTypeList)
    })
  }

  getDataSeat(){
    this.roomManagement.getAllSeat().subscribe(data=>{
      this.seatList = data;
      if (this.seatList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
      }
      for (let i = 0; i < this.rowList.length ; i++) {
        this.arrayListSeat[i] = this.seatList.filter(x => x.row.rowId == this.rowList[i].rowId)
      }
    })
  }

  changeColor(seatChange: Seat) {
    for (let i = 0; i < this.arrayListSeat.length ; i++) {
      for (let j = 0; j < this.arrayListSeat[i].length ; j++) {
        this.seat = this.arrayListSeat[i][j];
        if (this.arrayListSeat[i][j].seatId == seatChange.seatId) {
          if (this.arrayListSeat[i][j].seatType.seatTypeId == 1) {
            this.arrayListSeat[i][j].seatType = this.seatTypeList.filter(x => x.seatTypeId == 2)[0]
          } else {
            this.arrayListSeat[i][j].seatType = this.seatTypeList.filter(x => x.seatTypeId == 1)[0]
          }
          this.roomManagement.updateSeat(this.arrayListSeat[i][j]).subscribe(data =>{
            console.log("thanh cong")
          });
        }
      }
    }
  }
}

