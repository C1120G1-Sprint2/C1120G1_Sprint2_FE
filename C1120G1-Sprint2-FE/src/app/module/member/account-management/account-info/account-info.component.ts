import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountManagementService} from "../../../../service/member/account-management/account-management.service";
import {User} from "../../../../model/user";
import {ToastrService} from "ngx-toastr";
import {Account} from "../../../../model/account";

@Component({
    selector: 'app-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
    rfEditForm: FormGroup;
    rfPasswordForm: FormGroup;
    users: User;
    username: string = 'hoangsang123';
    accounts: Account;

    newPwNotify: string = '';
  oldPass: string = '';
  notification: string;




    constructor(private accountManagementService: AccountManagementService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getUsername();
        this.initFormPassword();
        this.getPasswordOld();
    }


    private initForm() {
        this.rfEditForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]+$"), Validators.maxLength(20)]],
            birthday: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            email: ["", [Validators.required, Validators.email, Validators.maxLength(30)]],
            idCard: ['', [Validators.required,Validators.pattern('^[0-9]{10,12}$')]],
            phone: ['', [Validators.required, Validators.pattern('^\\+84[0-9]{9,10}$')]],
        });
    }

    getUsername() {
        this.accountManagementService.getUserByUserName(this.username).subscribe(data => {
            this.rfEditForm.patchValue(data)
            console.log(data);
        }, error => {
            console.log("Get " + error + " on getInfoUser()");
        });
    }

    onSubmit() {
        console.log(this.rfEditForm.value);
        this.users = this.rfEditForm.value;
        this.accountManagementService.editUser(this.rfEditForm.value, this.username).subscribe(data => {
            this.users = data;
            this.router.navigateByUrl('/member/info');
            this.toastr.success("Chỉnh Sửa Thành Công ! !", "Tài Khoản ! ", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing'
            });
        })
    }

    private initFormPassword() {

        this.rfPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
            confirmNewPassword: ['', [Validators.required, this.comparePassword]]
        }, {validators: this.comparePassword})
    }

    comparePassword(c: AbstractControl) {
        const value = c.value;
        return (value.newPassword === value.confirmNewPassword) ? null : {
            passwordNotMatch: true
        };
    }

    getPasswordOld() {
      if (this.oldPass == null || this.oldPass == '' || this.oldPass == undefined) {
        this.notification = 'Vui lòng nhập mật khẩu';
      } else{
        this.accountManagementService.getPasswordOld(this.username).subscribe(data => {
          if(data){
            this.rfPasswordForm.patchValue(data);
            this.accounts = data;
            this.notification = '';
            console.log(data);
          }else
            this.notification = 'Mật khẩu không đúng, bạn có chắc đây là mật khẩu hiện tại của bạn không';
        }, error => {
          console.log("Get " + error + " on getInfoUser()");
        });
      }
    }

    onSubmitPass(rfPasswordForm: FormGroup) {
        this.accountManagementService.setNewPassword(this.username, rfPasswordForm.value.newPassword).subscribe(data => {
            this.toastr.success('Đổi Mật Khẩu Thành Công', "Tài Khoản");
            this.ngOnInit();
        }, error => {
            this.newPwNotify = "Đã gặp sự cố, chưa thể cập nhật lại mật khẩu cho bạn!";
        })
    }
}
