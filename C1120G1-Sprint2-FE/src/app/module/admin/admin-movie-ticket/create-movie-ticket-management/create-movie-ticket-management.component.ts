import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Room} from '../../../../model/room';
import {Movie} from '../../../../model/movie';
import {ShowTime} from '../../../../model/showTime';
import {ProjectionType} from '../../../../model/projectionType';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';
import {MovieTicket} from '../../../../model/movieTicket';

@Component({
  selector: 'app-create-movie-ticket-management',
  templateUrl: './create-movie-ticket-management.component.html',
  styleUrls: ['./create-movie-ticket-management.component.css']
})
export class CreateMovieTicketManagementComponent implements OnInit {
  formAddNewMovieTicket: FormGroup;
  movieTicket: MovieTicket;
  rooms: Room[];
  movies: Movie[];
  showTimes: ShowTime[];
  projectionTypes: ProjectionType[];
  constructor(private movieTicketManagementService: MovieTicketManagementService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.movieTicketManagementService.getAllRoom().subscribe(data => {
        this.rooms = data;
    })
    this.movieTicketManagementService.getAllMovie().subscribe(dataMovie => {
      this.movies = dataMovie;
    })
    this.movieTicketManagementService.getAllShowTime().subscribe(dataShowTime => {
      this.showTimes = dataShowTime;
    })
    this.movieTicketManagementService.getAllProjectionType().subscribe(dataProjectionType => {
      this.projectionTypes = dataProjectionType;
    })
    this.formAddNewMovieTicket = this.formBuilder.group({
      room: ['', [Validators.required]],
      movie: ['',[Validators.required]],
      projectionType: ['', [Validators.required]],
      showTime: ['', [Validators.required]],
      showDate: ['', [Validators.required]],

    })

  }

  addNewMovieTicket() {
    console.log(this.formAddNewMovieTicket.value);
    this.movieTicketManagementService.createMovieTicket(this.formAddNewMovieTicket.value).subscribe(data => {
      this.router.navigateByUrl('/admin/movie-ticket');
    }, error => {
      this.toast.error("Error", "Notification");
    })

  }

  onChange(projectionName: string, checked: boolean) {

  }

  cancel() {
    this.router.navigateByUrl('/admin/movie-ticket');
  }
}
