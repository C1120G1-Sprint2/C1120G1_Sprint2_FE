import { Component, OnInit } from '@angular/core';
import {AccountManagementService} from "../../../../service/member/account-management/account-management.service";
import {FormGroup} from "@angular/forms";

import {Account} from "../../../../model/account";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-nav-bar-account-manager',
  templateUrl: './nav-bar-account-manager.component.html',
  styleUrls: ['./nav-bar-account-manager.component.css']
})
export class NavBarAccountManagerComponent implements OnInit {
  rfEditForm: FormGroup;
   username: string = 'hoangsang123';
  accounts: Account;
  users: User;

  constructor(private accountManagementService: AccountManagementService
  ) {
  }

  ngOnInit(): void {
    this.getUsername();
    this.getPasswordOld();
  }
  getPasswordOld() {
    this.accountManagementService.getPasswordOld(this.username).subscribe(data => {
      this.accounts = data;
      console.log(data);
    }, error => {
      console.log("Get " + error + " on getInfoUser()");
    });
  }
  getUsername() {
    this.accountManagementService.getUserByUserName(this.username).subscribe(data => {
      this.rfEditForm.patchValue(data)
      this.users=data;
      console.log(data);
    }, error => {
      console.log("Get " + error + " on getInfoUser()");
    });
  }
}
