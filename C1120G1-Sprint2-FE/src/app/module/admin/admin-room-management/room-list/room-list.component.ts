import { Component, OnInit } from '@angular/core';
import {Room} from '../../../../model/room';
import {ToastrService} from 'ngx-toastr';
import {RoomManagementService} from '../../../../service/admin/room-management/room-management.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  roomList: Room[] = [];
  deleteId: number;
  deleteName: string;

  constructor(private roomManagement: RoomManagementService,
              private toast: ToastrService ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.roomManagement.getAllRoom().subscribe(data=>{
      this.roomList = data;
      if (this.roomList === null){
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống','Thông báo')
      }
    })
  }

  deleteSuccess() {
    this.ngOnInit();
  }

}
