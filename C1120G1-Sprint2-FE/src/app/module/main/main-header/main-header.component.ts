import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from '../../../model/user';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {UserServiceService} from '../../../service/user/user-service.service';
import {SecurityService} from '../../../service/security/security.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  username: string = '';
  role: string = '';
  user: User;
  avatarUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/login%2Fuser.jpg?alt=media&token=d3149a38-f6f3-42d2-b8bf-b79d78049b89';

  constructor(private router: Router,
              private tokenStore: TokenStorageService,
              private userService: UserServiceService,
              private securityService: SecurityService) { }

  ngOnInit(): void {
    if (this.tokenStore.getToken()) {
      const user = this.tokenStore.getUser();
      this.securityService.isLoggedIn = true;
      this.role = user.authorities[0].authority;
      this.username = user.username;
      this.getAvatarUrl(this.username);
    }
    if (this.tokenStore.getToken()){
      this.user = this.tokenStore.getUser().user;
      this.role = this.tokenStore.getUser().authorities[0].authority;

    }
  }

  search(keySearch: string) {
    console.log(keySearch);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/search"], {queryParams: {q: keySearch}});
    });
  }
  getAvatarUrl(username:string) {
    this.userService.getUserByUserName(username).subscribe(data => {
      this.user = data;
      this.avatarUrl = this.user.avatarUrl;
      console.log("URL : "+this.avatarUrl)
    }, error => {
      console.log("get "+error+" at getAvatarUrl()");
    })
  }
  logout() {
    this.tokenStore.signOut();
    this.router.navigateByUrl("/login");
  }

  showProfile() {
    document.getElementById("profile").style.display = 'block';
  }

  hideProfile() {
    document.getElementById("profile").style.display = 'none';
  }
}
