import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MovieManagementService} from '../../../../service/employee/movie-management/movie-management.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MovieTicket} from '../../../../model/movieTicket';
import {ShowTime} from '../../../../model/showTime';
import {ProjectionType} from '../../../../model/projectionType';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Movie} from '../../../../model/movie';
import {Room} from '../../../../model/room';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-movie-ticket-management',
  templateUrl: './edit-movie-ticket-management.component.html',
  styleUrls: ['./edit-movie-ticket-management.component.css']
})
export class EditMovieTicketManagementComponent implements OnInit {
  public movieTicketId;
  movies: Movie[];
  movieTicket: MovieTicket;
  rooms: Room[];
  room: Room;
  showTimes: ShowTime[];
  showTime: ShowTime;
  projectionTypes: ProjectionType[];
  projectionType: ProjectionType;
  rfEditForm: FormGroup;
    constructor(private movieTicketManagementService: MovieTicketManagementService,
              private router: Router,
              private dialogRef: MatDialogRef<EditMovieTicketManagementComponent>,
              @Inject(MAT_DIALOG_DATA)private data: any,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) { }

  ngOnInit(): void {
    this.movieTicketId = this.data.data1.movieTicketId;
    console.log("data " +this.movieTicketId);
    this.movieTicketManagementService.getMovieTicketById(this.movieTicketId).subscribe(data => {
      console.log('Data ' + JSON.stringify(data));

      this.movieTicketManagementService.getAllRoom().subscribe(dataRoom => {
          this.rooms = dataRoom;
      })
      // this.movieTicketManagementService.getAllMovie().subscribe(dataMovie => {
      //   this.movies = dataMovie;
      // })
      this.movieTicketManagementService.getAllShowTime().subscribe(dataShowTime => {
        this.showTimes = dataShowTime;
      })
      this.movieTicketManagementService.getAllProjectionType().subscribe(dataProjectionType => {
        this.projectionTypes = dataProjectionType;
      })
      this.movieTicket = data;
      this.rfEditForm.patchValue({
        movieTicketId: data.movieTicketId,
        movie: data.movie,
        room: data.room,
        showTime: data.showTime,
        projectionType: data.projectionType,
        showDate: data.showDate,
        ticketPrice: data.ticketPrice
      })
    })
    this.rfEditForm = this.formBuilder.group({
      movieTicketId: [''],
      movie: ['', [Validators.required]],
      room: ['', [Validators.required]],
      showTime: ['', [Validators.required]],
      projectionType: ['', [Validators.required]],
      showDate: ['', [Validators.required]],
      ticketPrice: ['', [Validators.required]]
    })

  }


  editMovieTicket() {
      console.log(this.rfEditForm.value);
    this.movieTicketManagementService.editMovieTicket(this.rfEditForm.value,this.movieTicketId).subscribe(data => {
      // this.movieTicket = data;
      // console.log("id edit" + this.movieTicketId);
      this.dialogRef.close();
      this.toastr.success("Edit successfully", "Notification");
    }, error => {
      this.toastr.warning("Error !", "Notification");
    })
  }
  close() {
    this.dialogRef.close();
  }

 compareRoom(room1: Room, room2: Room): boolean {
      return room1 && room2 ? room1.roomId === room2.roomId : room1 === room2
 }
 compareShowTime(showTime1: ShowTime, showTime2: ShowTime): boolean {
      return showTime1 && showTime2 ? showTime1.showTimeId === showTime2.showTimeId : showTime1 === showTime2
 }

 compareProjectionType(projectionType1: ProjectionType, projectionType2: ProjectionType): boolean {
      return projectionType1 && projectionType2 ? projectionType1.projectionId === projectionType2.projectionId : projectionType1 === projectionType2
 }

 // onChangeRoom(event) {
 //   let movieTicketRoom = this.rfEditForm.controls['room'].value;
 //   const roomMId = movieTicketRoom.roomId;
 //   if (roomMId) {
 //     this.movieTicketManagementService.getRoomById(roomMId).subscribe(data => {
 //       this.rooms = data;
 //       console.log(data+ "room");
 //     })
 //   } else {
 //     this.rooms = null;
 //   }
 // }
 //
 //  onChangeShowTime(event) {
 //    let movieTicketShowTime = this.rfEditForm.controls['showTime'].value;
 //    const showTimeMId = movieTicketShowTime.showTimeId;
 //    if (showTimeMId) {
 //      this.movieTicketManagementService.getShowTimeById(showTimeMId).subscribe(data => {
 //        this.showTimes = data;
 //        console.log(data);
 //      })
 //    } else {
 //      this.showTimes = null;
 //    }
 //  }
 //
 //  onChangeProjectionType(event) {
 //    let movieTicketProjection = this.rfEditForm.controls['projectionType'].value;
 //    const projectionTypeId = movieTicketProjection.projectionId;
 //    if (projectionTypeId) {
 //      this.movieTicketManagementService.getProjectionTypeById(projectionTypeId).subscribe(data => {
 //        this.projectionTypes = data;
 //        console.log(data);
 //      })
 //    } else {
 //      this.showTimes = null;
 //    }
 //  }



}
