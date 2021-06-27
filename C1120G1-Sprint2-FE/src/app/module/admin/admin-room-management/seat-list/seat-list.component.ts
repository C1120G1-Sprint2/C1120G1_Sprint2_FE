import {Component, OnInit} from '@angular/core';
import {Row} from '../../../../model/row';
import {Column} from '../../../../model/column';
import {Seat} from '../../../../model/seat';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';
import {ToastrService} from 'ngx-toastr';
import {SeatType} from '../../../../model/seatType';
import {Room} from '../../../../model/room';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RoomSeat} from '../../../../model/roomSeat';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {

  rowList: Row[] = [];
  seat: Seat;
  seatTypeList: SeatType[];
  roomSeatList : RoomSeat[];
  roomId;
  roomDetail: Room;

  constructor(private roomManagement: RoomManagementService,
              private toast: ToastrService,
              private active: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.getDataColumn();
    this.getDataRow();
    this.getDataSeatType();

    this.active.paramMap.subscribe((data: ParamMap) => {
      this.roomId = data.get('id');
      this.roomManagement.getAllSeatByRoomId(this.roomId).subscribe(data=>{
        this.roomSeatList = data;
        if (this.roomSeatList === null) {
          this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
        }
      });
      console.log(this.roomId);
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

  // getDataColumn() {
  //   this.roomManagement.getAllColumn().subscribe(data => {
  //     this.columnList = data;
  //     if (this.columnList === null) {
  //       this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
  //     }
  //   });
  // }

  getDataSeatType(){
    this.roomManagement.getAllSeatType().subscribe(data =>{
      this.seatTypeList = data;
      if (this.seatTypeList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
      }
      console.log(this.seatTypeList)
    })
  }

  changeColor(seatChange: Seat) {
    this.roomManagement.updateSeat(seatChange).subscribe(data=>{
      this.toast.success("Thay đổi loại ghế thành công", "Thông báo")
    })
  }
}

