import { Component, OnInit } from '@angular/core';
import {MovieTicket} from '../../../../model/movieTicket';
import {Room} from '../../../../model/room';
import {Movie} from '../../../../model/movie';
import {ShowTime} from '../../../../model/showTime';
import {ProjectionType} from '../../../../model/projectionType';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {EditMovieTicketManagementComponent} from '../edit-movie-ticket-management/edit-movie-ticket-management.component';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';

@Component({
  selector: 'app-list-movie-ticket-management',
  templateUrl: './list-movie-ticket-management.component.html',
  styleUrls: ['./list-movie-ticket-management.component.css']
})
export class ListMovieTicketManagementComponent implements OnInit {
  pageClicked = 0;
  totalPages = 1;
  size = 5;
  pages = [];
  textSorting = '';
  onSorting = false;
  movieTickets: MovieTicket[];
  room: Room[];
  movie: Movie[];
  showTime: ShowTime[];
  projectionType: ProjectionType[];
  deleteId: number;
  deleteName: string;
  editId: number;
  keySearch: string = '';
  deleteMovieName: string;

  constructor(private toast: ToastrService,
              private movieTicketManagement: MovieTicketManagementService,
              private dialog: MatDialog,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  deleteSuccess() {
    this.ngOnInit();
  }


  openDialog(id: number) {
    this.movieTicketManagement.getMovieTicketById(id).subscribe(dataEdit => {
      const dialogRef = this.dialog.open(EditMovieTicketManagementComponent, {
        data: {data1: dataEdit},
        width: '500px',
        disableClose: true
      })
      console.log('id nhan dc' + id);
      console.log(dataEdit);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit()
      })
    });

  }

  search(page) {
    this.movieTicketManagement.getMovieTicketByKeySearch(this.keySearch, this.size).subscribe(dataSearch => {
      this.movieTickets = dataSearch.content;
      this.pageClicked = page;
      this.totalPages = dataSearch.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      this.toast.success("Search Successfully !", "Notification");

    }, error => {
      this.toast.error("Not Found", "Notification");
    })
  }

//  phan trang

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  onSubmit(page) {
    this.movieTicketManagement.getAllMovieTicket(page, this.size, this.onSorting, this.textSorting).subscribe(data => {
      console.log(data.content);
      this.movieTickets = data.content;
      this.pageClicked = page;
      this.totalPages = data.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      if (data === null) {
        this.toast.warning("No find data in DB", "Notification", {
          timeOut: 5000,
          progressAnimation: "increasing"
        });
      }
    })
  }

  selectPagination: number;


  onSortChange(value) {
    if (this.textSorting == "") {
      this.textSorting = value;
    } else {
      this.textSorting = "";
    }
    this.ngOnInit();
  }

  selectPage() {
    if (this.selectPagination < 1) {
      this.pageClicked = this.selectPagination;
      this.onFirst();
      this.toastr.warning('Không tìm thấy trang hoặc danh sách đã hết', 'Thông báo', {
        timeOut: 3000,
        progressAnimation: 'increasing'
      });
    }
  }
}
