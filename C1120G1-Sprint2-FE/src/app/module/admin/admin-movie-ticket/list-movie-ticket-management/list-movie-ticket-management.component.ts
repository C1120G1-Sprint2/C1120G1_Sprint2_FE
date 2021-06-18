import { Component, OnInit } from '@angular/core';
import {MovieTicket} from '../../../../model/movieTicket';
import {Room} from '../../../../model/room';
import {Movie} from '../../../../model/movie';
import {ShowTime} from '../../../../model/showTime';
import {ProjectionType} from '../../../../model/projectionType';
import {ToastrService} from 'ngx-toastr';
import {MovieManagementService} from '../../../../service/employee/movie-management/movie-management.service';
import {MatDialog} from '@angular/material/dialog';
import {EditMovieTicketManagementComponent} from '../edit-movie-ticket-management/edit-movie-ticket-management.component';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';

@Component({
  selector: 'app-list-movie-ticket-management',
  templateUrl: './list-movie-ticket-management.component.html',
  styleUrls: ['./list-movie-ticket-management.component.css']
})
export class ListMovieTicketManagementComponent implements OnInit {
  movieTickets: MovieTicket[];
  room: Room[];
  movie: Movie[];
  showTime: ShowTime[];
  projectionType: ProjectionType[];
  deleteId: number;
  deleteName: string;
  editId: number;
  keySearch: string = '';

  constructor(private toast: ToastrService,
              private movieTicketManagement: MovieTicketManagementService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.movieTicketManagement.getAllMovieTicket().subscribe(data => {
      this.movieTickets = data;
      if (data === null) {
        this.toast.warning("No find data in DB", "Notification", {
          timeOut: 5000,
          progressAnimation: "increasing"
        });
      }
    })
  }

  deleteSuccess() {
    this.ngOnInit();
    this.toast.success("Delete complete", "Notification");
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
      dialogRef.afterClosed().subscribe(result => {this.ngOnInit()})
    });

  }

  searchEnter() {

  }

  search() {

  }
}
