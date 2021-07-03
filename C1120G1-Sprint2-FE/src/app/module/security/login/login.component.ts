import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../service/security/security.service';
import {Router} from '@angular/router';
import {AuthLogin} from '../../../model/authLogin';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {UserSocial} from '../../../model/userSocial';

// import {MainHeaderComponent} from '../../main/main-header/main-header.component';

const defaultImage:string = "https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/login%2Fuser.jpg?alt=media&token=d3149a38-f6f3-42d2-b8bf-b79d78049b89";
const accessToken:string = "EAAG5AW0TdCABAHAg66E1z9vutIS9KXZCDvd5ikGYAyCILTNOSrjVRnYaWOHYRFXiEDWZCZCDIBI723IEZAwXUnhZCXUyQObZAxXLV1HrsdKf0d8unc5yX3r20PlGNGvm8u3fTVayy2J17fg0Y0yxw0jcWscFZCMZBDnqhvIV9dy4PQZDZD";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  textType: boolean = false;
  authLogin: AuthLogin;
  role: string = '';
  username: string;
  auth2: any;
  user:UserSocial;
  id:any;
  fullName:string;
  token:any;
  wrongAccountMessage: string;
  statusAccountMessage: string;
  unconfirmEmailStatus: number = 1;
  activeStatus: number = 2;
  deletedStatus: number = 3;
  lockedStatus: number = 4;

  constructor(private formBuilder: FormBuilder,
              private securityService: SecurityService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              // private headerComponent: MainHeaderComponent
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.minLength(6), Validators.maxLength(45)]],
      password: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(45)]],
      remember: ['']
    });

    if (this.tokenStorageService.getToken() != undefined) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.role = user.authorities[0].authority;
      this.username = user.username;
    }
  }

  get formUsername() {
    return this.form.get('username');
  }

  get formPassword() {
    return this.form.get('password');
  }

  public login(authLogin) {
    this.securityService.login(authLogin).subscribe(
      data => {
        if (this.form.value.remember) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }
        console.log(this.tokenStorageService.getUser());
        console.log(data);
        switch (this.tokenStorageService.getUser().user.account.accountStatus.accountStatusId) {
          case this.unconfirmEmailStatus: {
            console.log('Account unconfirm email: LoginComponent');
            this.statusAccountMessage = 'Tài khoản chưa xác nhận email!';
            this.clearStorage();
            break;
          }
          case this.activeStatus: {
            this.securityService.isLoggedIn = true;
            this.username = this.tokenStorageService.getUser().username;
            // this.role = this.tokenStorageService.getUser().authorities[0].authority;
            this.form.reset();

            // this.headerComponent.ngOnInit();
            this.router.navigateByUrl('/');
            break;
          }
          case this.deletedStatus: {
            console.log('Account has been deleted: LoginComponent');
            this.wrongAccountMessage = 'Username/Mật khẩu không đúng. Vui lòng thử lại!';
            this.clearStorage();
            break;
          }
          case this.lockedStatus: {
            console.log('Account has been locked: LoginComponent');
            this.statusAccountMessage = 'Tài khoản đã bị khoá!';
            this.clearStorage();
            break;
          }
        }
      },
      err => {
        console.log('Error at login function on LoginComponent');
        this.wrongAccountMessage = 'Username/Mật khẩu không đúng. Vui lòng thử lại!';
        this.securityService.isLoggedIn = false;
      }
    );
  }

  submitForm() {
    this.wrongAccountMessage = '';
    this.statusAccountMessage = '';
    this.authLogin = new AuthLogin(this.formUsername.value, this.formPassword.value);
    this.login(this.authLogin);
  }

  toggleShowHide() {
    this.textType = !this.textType;
  }

  clearStorage() {
    this.securityService.isLoggedIn = false; // ktra đăng nhập hay chưa
    this.tokenStorageService.signOut();
  }

  loginFacebook() {
    window['FB'].login((response) => {
      if (response.authResponse) {

        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {
          this.fullName = userInfo.first_name +" "+ userInfo.last_name;
          this.user = new UserSocial(
            accessToken,
            this.fullName,
            defaultImage,
            userInfo.email
          );
          console.log(userInfo);
          this.securityService.createUserFacebook(this.user).subscribe(data => {
            console.log("Success : "+data);
            this.tokenStorageService.saveTokenLocal(data.accessToken);
            this.tokenStorageService.saveUserLocal(data);

            this.securityService.isLoggedIn = true;
            this.username = this.tokenStorageService.getUser().username;
            this.role = this.tokenStorageService.getUser().authorities[0].authority;

            // this.appComponent.ngOnInit().then();
            // this.headerComponent.ngOnInit();
            this.router.navigateByUrl("/");

          }, error => {
            console.log(error.err.message);
          })
        });
      } else {
        console.log('User login failed');
      }
    }, {scope: 'email'});
  }


}
