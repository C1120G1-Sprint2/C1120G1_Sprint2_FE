import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../service/security/security.service';
import {Router} from '@angular/router';
import {AuthLogin} from '../../../model/authLogin';
import {TokenStorageService} from '../../../service/security/token-storage.service';

// import {MainHeaderComponent} from '../../main/main-header/main-header.component';

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
  wrongAccountMessage: string;
  lockedAccountMessage: string;
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

        if (this.tokenStorageService.getUser().user.account.accountStatus.accountStatusId !== this.lockedStatus) {
          this.securityService.isLoggedIn = true;
          this.username = this.tokenStorageService.getUser().username;
          // this.role = this.tokenStorageService.getUser().authorities[0].authority;
          this.form.reset();
          console.log('Login Success');
          // this.headerComponent.ngOnInit();
          this.router.navigateByUrl('/');
        } else {
          console.log('Account has been locked function on LoginComponent');
          this.lockedAccountMessage = 'Tài khoản đã bị khoá!';
          this.securityService.isLoggedIn = false; // ktra đăng nhập hay chưa
          this.tokenStorageService.signOut();
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
    this.authLogin = new AuthLogin(this.formUsername.value, this.formPassword.value);
    this.login(this.authLogin);
  }

  toggleShowHide() {
    this.textType = !this.textType;
  }
}
