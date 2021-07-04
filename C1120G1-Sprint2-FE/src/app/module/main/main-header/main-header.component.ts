import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from '../../../model/user';
import {TokenStorageService} from "../../../service/security/token-storage.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  username: string = '';
  role: string = '';
  user: User;
  avatarUrl: string = '';

  constructor(private router: Router,
              private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()){
      this.user = this.tokenStorageService.getUser().user;
      this.role = this.tokenStorageService.getUser().authorities[0].authority;
    }
  }

  search(keySearch: string) {
    console.log(keySearch);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/search"], {queryParams: {q: keySearch}});
    });
  }
}
