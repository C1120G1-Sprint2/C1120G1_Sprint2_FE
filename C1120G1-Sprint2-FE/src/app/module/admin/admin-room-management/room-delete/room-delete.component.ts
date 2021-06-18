import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';
import {Room} from '../../../../model/room';

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.css']
})
export class RoomDeleteComponent implements OnInit {
  @Input()
  deleteId: number;
  @Input()
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  public listRoom: Room[];
  public lengthRoomList: number;

  constructor(public roomManagementService: RoomManagementService,
              private active: ActivatedRoute,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.roomManagementService.getAllRoom().subscribe((data) => {
      this.listRoom = data;
      this.lengthRoomList = this.listRoom.length;
    })
  }

  deleteRoom() {
    this.roomManagementService.deleteRoom(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    this.toast.success('Xóa Thành Công !', 'Phòng chiếu !');
  }
}
