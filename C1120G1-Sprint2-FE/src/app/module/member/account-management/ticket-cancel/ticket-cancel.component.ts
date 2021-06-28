import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {BookTicketsService} from "../../../../service/member/book-tickets/book-tickets.service";

@Component({
  selector: 'app-ticket-cancel',
  templateUrl: './ticket-cancel.component.html',
  styleUrls: ['./ticket-cancel.component.css']
})
export class TicketCancelComponent implements OnInit {

  @Input()
  deleteId: number;
  @Input()
  deleteTitle: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  // @ts-ignore
  // @ts-ignore
  constructor(private bookTicketsService: BookTicketsService,
              private activatedRoute: ActivatedRoute,
              private _router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }


  deletePost() {
    this.bookTicketsService.deleteByIdTickets(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    this.toastr.success('Xóa Thành Công !', 'Bài Đăng !');
  }
}
