import {Component, OnInit} from '@angular/core';
import {Ward} from '../../../../model/ward';
import {ToastrService} from 'ngx-toastr';

import {MemberManagementService} from '../../../../service/employee/member-management/member-management.service';
import {AddressPreview, UserPreview} from '../../../../model/userPreview';

@Component({
  selector: 'app-employee-list-user',
  templateUrl: './employee-list-user.component.html',
  styleUrls: ['./employee-list-user.component.css']
})
export class EmployeeListUserComponent implements OnInit {

  users: UserPreview[] = [];
  public accounts: Account[] = [];
  public wards: Ward[] = [];
  keySearch: string = '';
  deleteId: number;
  deleteName: string;
  p: number = 1;
  page: number = 1;
  indexPagination: number = 1;
  totalPagination: number = 0;
  selectPagination: number;

  constructor(private memberManagementService: MemberManagementService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.memberManagementService.getAllUsers(this.indexPagination).subscribe(data => {
      this.users = data;
      console.log(this.users);
      if (data === null) {
        this.toastr.warning('Không tìm thấy dữ liệu', 'Thông báo', {
          timeOut: 3000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  firstPage() {
    this.indexPagination = 1;
    this.loadData();
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    this.memberManagementService.getAllUsers((this.indexPagination * 5) - 5).subscribe(data => {
      this.users = data;
      if (this.users === null) {
        this.toastr.warning('Không tìm thấy trang hoặc danh sách đã hết', 'Thông báo', {
          timeOut: 3000,
          progressAnimation: 'increasing'
        });
        this.firstPage();
      }
    });
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.memberManagementService.getAllUsers(1).subscribe(data => {
        this.users = data;
      });
    }
    this.memberManagementService.getAllUsers(this.indexPagination).subscribe(data => {
      console.log(this.indexPagination);
      this.users = data;
    });
  }

  selectPage() {
    this.indexPagination = this.selectPagination;
    this.memberManagementService.getAllUsers(this.selectPagination).subscribe(data => {
      this.users = data;
      if (this.users == null) {
        this.toastr.warning('Quá số trang tìm kiếm', 'Thông báo', {
          timeOut: 3000,
          progressAnimation: 'increasing'
        });
        this.firstPage();
      }
    });
  };


  deleteSuccess() {
    this.loadData();
    this.toastr.success('Khoá Thành Công', 'Thông Báo');
  }

  getAddress(address: AddressPreview): string {
    let addressCustom = '';
    if (address) {
      if (address.wardName) {
        addressCustom += address.wardName;
      }
      if (address.districtName) {
        addressCustom += ', ' + address.districtName;
      }
      if (address.provinceName) {
        addressCustom += ', ' + address.provinceName;
      }
    }
    return addressCustom;
  }

  searchEnter() {
    this.memberManagementService.searchUserBySomething(this.keySearch).subscribe(data => {
      this.users = data;
      if (data === null) {
        this.toastr.warning('Không tìm thấy kết quả', 'Thông báo', {
          timeOut: 5000,
          progressAnimation: 'increasing'
        });
        this.firstPage();
      }
    });
  }

  search() {
    this.memberManagementService.searchUserBySomething(this.keySearch).subscribe(data => {
      console.log(data);
      if (data === null) {
        this.toastr.warning('Không tìm thấy kết quả', 'Thông báo');
      } else {
        this.users = data;
        this.toastr.success('Tìm thấy kết quả', 'Thông báo');
      }
    });
  }

}
