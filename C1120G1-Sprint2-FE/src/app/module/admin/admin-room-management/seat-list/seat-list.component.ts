import {Component, OnInit} from '@angular/core';
import {Row} from '../../../../model/row';
import {Column} from '../../../../model/column';
import {Seat} from '../../../../model/seat';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';
import {ToastrService} from 'ngx-toastr';
import {SeatType} from '../../../../model/seatType';
import {Room} from '../../../../model/room';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RoomSeat} from '../../../../model/roomSeat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {

  rowList: Row[] = [];
  seat: Seat;
  seatTypeList: SeatType[];
  roomSeatList: RoomSeat[];
  roomSeatTotal: RoomSeat[];
  roomId;
  roomDetail: Room;
  form: FormGroup;
  seatDelete: RoomSeat[];
  type;

  constructor(private roomManagement: RoomManagementService,
              private toast: ToastrService,
              private active: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getDataRow();
    this.getDataSeatType();
    this.getSeatTotal();
    this.getSeatDelete();

    this.active.paramMap.subscribe((data: ParamMap) => {
      this.roomId = data.get('id');
      this.roomManagement.getAllSeatByRoomId(this.roomId).subscribe(data => {
        this.roomSeatList = data;
        if (this.roomSeatList === null) {
          this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
        }
      });

      this.roomManagement.getRoomById(this.roomId).subscribe((data: Room) => {
        if (data === null) {
          this.toast.warning('Dữ liệu không có', 'Thông báo');
        } else {
          this.roomDetail = data;
        }
      });
    });

    this.form = this.fb.group({
      selectSeat: ['', Validators.required],
      selectSeatType: ['', Validators.required]
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

  getDataSeatType() {
    this.roomManagement.getAllSeatType().subscribe(data => {
      this.seatTypeList = data;
      if (this.seatTypeList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống', 'Thông báo');
      }
    });
  }

  changeColor(seatChange: Seat) {
    this.roomManagement.updateSeat(seatChange).subscribe(data => {
      this.toast.success('Thay đổi loại ghế thành công', 'Thông báo');
      this.ngOnInit();
    });
  }

  deleteSeat(roomSeatId: any) {
    this.roomManagement.deleteSeat(roomSeatId).subscribe(data => {
      this.toast.success('Xóa ghế thành công', 'Thông báo');
      this.ngOnInit();
    });
  }

  getSeatTotal() {
    this.active.paramMap.subscribe((data: ParamMap) => {
      this.roomId = data.get('id');
      this.roomManagement.getSeatTotal(this.roomId).subscribe(data => {
        this.roomSeatTotal = data;
      });
    });
  }

  getSeatDelete() {
    this.roomManagement.showSeatDelete().subscribe(data => {
      this.seatDelete = data;
    });
  }

  save() {
    if (this.form.valid) {
      this.roomManagement.createSeat(this.form.value.selectSeat.roomSeatId).subscribe((data) => {
        this.roomManagement.createSeatBySeatType(this.form.value.selectSeatType.seatTypeId, this.form.value.selectSeat.seat.seatId).subscribe((data1) => {
          this.ngOnInit();
          this.toast.success('Tạo mới ghế thành công !', 'Thông báo', {timeOut: 2000});
        });
      });
    } else {
      this.toast.warning('Hãy chọn đầy đủ thông tin trước khi tạo', 'Thông báo', {timeOut: 2000});
    }
  }
}
