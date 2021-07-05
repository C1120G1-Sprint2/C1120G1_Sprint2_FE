import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../service/security/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  username: string;
  email: string;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params.username;
    this.email = this.activatedRoute.snapshot.params.email;
    // console.log('username: ' + this.username + ' ,email: ' + this.email);
    this.securityService.confirmEmail(this.username, this.email).subscribe(data => {
      this.router.navigateByUrl('/login');
      this.toastr.success('Xác nhận tài khoản thành công', 'Xác nhận thành công', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing'
      });
    }, error => {
      this.router.navigateByUrl('/login');
      this.toastr.error('Xác nhận tài khoản thất bại', 'Xác nhận thất bại', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        }
      );
    });
  }

}
