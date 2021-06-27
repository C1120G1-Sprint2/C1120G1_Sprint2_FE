import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';
import {Room} from '../../../../model/room';
import {StatusRoom} from '../../../../model/statusRoom';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  formCreate: FormGroup;
  room: Room[] = [];
  roomStatusList = [];
  roomStatus: StatusRoom;

  constructor(private fb: FormBuilder,
              private router: Router,
              private roomManagementService: RoomManagementService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {

    this.roomManagementService.getAllRoomStatus().subscribe(data => {
      if (data === null) {
        this.toast.warning('Dữ liệu không có', 'Thông báo');
      } else {
        this.roomStatusList = data;
        console.log(data);
      }
    });

    this.formCreate = this.fb.group({
      roomName: ['', [Validators.required, Validators.pattern(/^(PC-)[0-9]{2}$/u)]],
      statusRoom: ['', Validators.required]
    });
  }

  save() {
    if (this.formCreate.valid) {
      this.roomStatus = this.formCreate.value.roomStatus;
      this.roomManagementService.searchRoomAbsolute(this.formCreate.value.roomName).subscribe((data) => {
        this.room = data;
        if (this.room === null) {
          this.roomManagementService.createRoom(this.formCreate.getRawValue()).subscribe(data => {
              this.toast.success('Phòng chiếu đã được tạo');
              this.router.navigateByUrl('admin/room');
            }
          );
        } else {
          this.toast.warning('Phòng chiếu đã tồn tại');
        }
      });
    }
  }
}
