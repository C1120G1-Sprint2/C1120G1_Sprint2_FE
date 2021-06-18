import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeManagementService} from '../../../../service/admin/employee-management/employee-management.service';
import {MemberManagementService} from '../../../../service/employee/member-management/member-management.service';
import {Router} from '@angular/router';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-employee-delete-user',
  templateUrl: './employee-delete-user.component.html',
  styleUrls: ['./employee-delete-user.component.css']
})
export class EmployeeDeleteUserComponent implements OnInit {
  @Input()
  deleteName: string;

  @Input()
  deleteId: number;

  user  : any;

  @Output()
  deleteComplete = new EventEmitter<boolean>();


  constructor(private memberService: MemberManagementService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  deletePatient() {
    this.user = this.memberService.getUserById(this.deleteId).subscribe(data =>{
      this.user =data ;
    this.memberService.deleteUser(this.deleteId,this.user).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    });
  }
}
