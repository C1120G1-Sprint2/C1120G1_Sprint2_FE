import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusRoom} from '../../../../model/statusRoom';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';
import {Room} from '../../../../model/room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  formEdit: FormGroup;
  roomId;
  roomEdit: Room;
  statusRoomList: StatusRoom[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private roomManagementService: RoomManagementService,
              private active: ActivatedRoute,
              private toast: ToastrService) {

    this.roomManagementService.getAllRoomStatus().subscribe(data => {
      this.statusRoomList = data;
      console.log(data);

    });
  }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      roomId: [''],
      roomName: ['', [Validators.required, Validators.pattern(/^(PC-)[0-9]{2}$/u)]],
      statusRoom: ['', Validators.required]
    });

    this.active.paramMap.subscribe((data: ParamMap) => {
      this.roomId = data.get('id');
      this.roomManagementService.getRoomById(this.roomId).subscribe((data: Room) => {
        if (data === null) {
          this.toast.warning('Dữ liệu không có', 'Thông báo');
        } else {
          this.roomEdit = data;
          this.formEdit.patchValue(this.roomEdit);
        }
      });
    });
  }

  compareFn(c1: StatusRoom, c2: StatusRoom): boolean {
    return c1 && c2 ? c1.statusRoomId === c2.statusRoomId : c1 === c2;
  }

  save() {
    this.roomManagementService.updateRoom(this.roomEdit.roomId, this.formEdit.getRawValue()).subscribe(data => {
      this.toast.success('Phòng chiếu đã được chỉnh sửa');
      this.router.navigateByUrl('/admin/room');
      if (this.roomEdit.roomId === null) {
        this.toast.warning('Phòng này không có', 'Thông báo');
      }
    });
  }
}
