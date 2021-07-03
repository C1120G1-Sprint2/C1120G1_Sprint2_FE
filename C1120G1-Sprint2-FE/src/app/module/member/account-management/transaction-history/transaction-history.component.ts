import { Component, OnInit } from '@angular/core';
import {TransactionHistory} from "../../../../model/transactionHistory";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionHistoryService} from "../../../../service/member/transaction-history/transaction-history.service";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../../service/security/token-storage.service";

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactionHistoryList: TransactionHistory[] = [];
  username: string ;
  keySearch: string = "";

  constructor(private transactionHistoryService: TransactionHistoryService,
              private activatedRoute: ActivatedRoute,
              private _router: Router,
              private toastr: ToastrService,
              private tokenStore: TokenStorageService) {
    this.username = this.tokenStore.getUser().user.account.username;
  }

  ngOnInit(): void {
    this.transactionHistoryService.findAll(this.username).subscribe(data => {
      this.transactionHistoryList = data;
      console.log(data);
    })
  }

  searchNameMovie() {
    console.log(this.keySearch);
    this.transactionHistoryService.searchNameMovie(this.username, this.keySearch).subscribe(data => {
      this.transactionHistoryList = data;
      console.log(data);
    })
  }

  inputKeySearch(inputKey: string) {
    this.keySearch = inputKey;
  }
}
