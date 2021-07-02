import { Component, OnInit } from '@angular/core';
import {TransactionHistory} from "../../../../model/transactionHistory";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionHistoryService} from "../../../../service/member/transaction-history/transaction-history.service";

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactionHistoryList: TransactionHistory[]=[];
  username: string = 'hoangsang123';

  constructor(private transactionHistoryService: TransactionHistoryService,
              private activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.transactionHistoryService.findAll(this.username).subscribe(data=>{
      this.transactionHistoryList=data;
      console.log(data);
    })
  }
}
