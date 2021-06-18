import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MovieManagementService} from '../../../../service/employee/movie-management/movie-management.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MovieTicket} from '../../../../model/movieTicket';
import {ShowTime} from '../../../../model/showTime';
import {ProjectionType} from '../../../../model/projectionType';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-movie-ticket-management',
  templateUrl: './edit-movie-ticket-management.component.html',
  styleUrls: ['./edit-movie-ticket-management.component.css']
})
export class EditMovieTicketManagementComponent implements OnInit {
  public movieTicketId;
  movieTicket: MovieTicket;
  showTimes: ShowTime[];
  projectionTypes: ProjectionType[];
  rfEditForm: FormGroup;
    constructor(private movieTicketManagementService: MovieTicketManagementService,
              private router: Router,
              private dialogRef: MatDialogRef<EditMovieTicketManagementComponent>,
              @Inject(MAT_DIALOG_DATA)private data: any) { }

  ngOnInit(): void {
    this.movieTicketId = this.data.data1.id;
    console.log(this.movieTicketId);
  }


  editMovieTicket() {
    this.movieTicketManagementService.editMovieTicket(this.movieTicket,this.movieTicketId).subscribe(data => {
      this.movieTicket = data;
      console.log("id edit" + this.movieTicketId);
      console.log("data xoa " + data);
      this.dialogRef.close();
    })
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {

  }
}
