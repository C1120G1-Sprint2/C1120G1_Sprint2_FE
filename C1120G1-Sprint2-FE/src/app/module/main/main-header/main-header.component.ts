import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from '../../../model/user';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(keySearch: string) {
    console.log(keySearch);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/search"], {queryParams: {q: keySearch}});
    });
  }
}
