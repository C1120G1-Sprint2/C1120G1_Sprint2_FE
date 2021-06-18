import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {Ward} from '../../../../model/ward';
import {ToastrService} from 'ngx-toastr';
import {EmployeeManagementService} from '../../../../service/admin/employee-management/employee-management.service';
import {Sort} from '@angular/material/sort';
import {MemberManagementService} from '../../../../service/employee/member-management/member-management.service';

@Component({
  selector: 'app-employee-list-user',
  templateUrl: './employee-list-user.component.html',
  styleUrls: ['./employee-list-user.component.css']
})
export class EmployeeListUserComponent implements OnInit {

  users: User[] = [];
  public accounts: Account[] = [];
  public wards: Ward[] = [];
  keySearch: string = '';
  deleteId: number;
  deleteName: string;
  p: number = 1;
  page: number = 1;

  constructor(private memberManagementService: MemberManagementService,
              private toastr: ToastrService) {
    this.users = this.users.slice();
  }

  ngOnInit(): void {
    this.memberManagementService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
      if (data === null) {
        this.toastr.warning('Không tìm thấy dữ liệu', 'Thông báo', {
          timeOut: 5000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  deleteSuccess() {
    this.ngOnInit();
    this.toastr.success('Xoá Thành Công' , 'Thông Báo');
  }
}

