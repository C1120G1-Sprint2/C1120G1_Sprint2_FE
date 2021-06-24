import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/ticket';
import {ToastrService} from 'ngx-toastr';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';

@Component({
  selector: 'app-book-ticket-list',
  templateUrl: './book-ticket-list.component.html',
  styleUrls: ['./book-ticket-list.component.css']
})
export class BookTicketListComponent implements OnInit {
  p: number = 1;
  totalLength: any;
  optionSearch = 1;
  keySearch: any;
  bookedTicketList: Ticket[] = [];
  bookedTicketListNoPage: Ticket[] = [];
  cancelId: number;
  indexPagination: number = 1;
  selectPagination: number;
  totalPagination: number;

  constructor(private bookTicketManagementService: BookTicketsManagementService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBookTicketList();
  }

  getBookTicketList() {
    this.bookTicketManagementService.getAllBookedTicketList(0).subscribe(data => {
      if (data == null) {
        this.bookedTicketList = [];
      } else {
        this.bookedTicketList = data;
        // this.totalLength = data.length;
      }
    });
    this.bookTicketManagementService.getAllBookedTicketListNoPage().subscribe(data => {
      this.bookedTicketListNoPage = data;
      if ((this.bookedTicketListNoPage.length % 3) != 0) {
        this.totalPagination = (Math.floor(this.bookedTicketListNoPage.length / 3)) + 1;
      }
    });
  }

  search() {
    if (this.optionSearch == 1) {
      this.bookTicketManagementService.searchTicketByTicketId(this.keySearch).subscribe(data => {
        if (data == null) {
          this.toastr.warning('Không tìm thấy !', 'Vé Đã Đặt !');
        } else {
          this.bookedTicketList = data.content;
        }
      });
    } else if (this.optionSearch == 2) {
      this.bookTicketManagementService.searchTicketByUserId(this.keySearch).subscribe(data => {
        if (data == null) {
          this.toastr.warning('Không tìm thấy !', 'Vé Đã Đặt !');
        } else {
          this.bookedTicketList = data.content;
        }
      });
    } else if (this.optionSearch == 3) {
      this.bookTicketManagementService.searchTicketByIdCard(this.keySearch).subscribe(data => {
        if (data == null) {
          this.toastr.warning('Không tìm thấy !', 'Vé Đã Đặt !');
        } else {
          this.bookedTicketList = data.content;
        }
      });
    } else {
      this.bookTicketManagementService.searchTicketByPhone(this.keySearch).subscribe(data => {
        if (data == null) {
          this.toastr.warning('Không tìm thấy !', 'Vé Đã Đặt !');
        } else {
          this.bookedTicketList = data.content;
        }
      });
    }
  }

  cancelSuccess() {
    this.getBookTicketList();
  }


  firstPage() {
    this.indexPagination = 1;
    this.getBookTicketList();
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.getBookTicketList();
    } else {
      this.bookTicketManagementService.getAllBookedTicketList((this.indexPagination * 3) - 3).subscribe(data => {
        this.bookedTicketList = data;
      });
    }
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
        this.indexPagination = this.indexPagination - 1;
    }
    this.bookTicketManagementService.getAllBookedTicketList((this.indexPagination * 3) - 3).subscribe(data => {
      this.bookedTicketList = data;
      if (data == null) {
        this.toastr.warning('Quá số trang tìm kiếm !', 'Vé Đã Đặt !');
      }
    });
  }

  lastPage() {
    this.indexPagination = (Math.floor(this.bookedTicketListNoPage.length / 3)) + 1;
    this.bookTicketManagementService.getAllBookedTicketList((this.indexPagination * 3) - 3).subscribe(data =>{
      this.bookedTicketList = data;
      if (data == null) {
        this.toastr.warning('Quá số trang tìm kiếm !', 'Vé Đã Đặt !');
      }
    });
  }

  selectPage() {
    this.bookTicketManagementService.getAllBookedTicketList((this.selectPagination * 3) - 3).subscribe(data =>{
      this.bookedTicketList = data;
      if (data == null) {
        this.toastr.warning('Quá số trang tìm kiếm !', 'Vé Đã Đặt !');
        this.firstPage();
      }
    });
  }

}
