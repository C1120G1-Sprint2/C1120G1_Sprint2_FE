import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Room} from '../../../../model/room';
import {Movie} from '../../../../model/movie';
import {ShowTime} from '../../../../model/showTime';
import {ProjectionType} from '../../../../model/projectionType';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';
import {MovieTicket} from '../../../../model/movieTicket';
import {MovieTicketDTO} from '../../../../model/movieTicketDTO';

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
  selectedShowTimes: ShowTime[] = [];
  movieTicketDTO: MovieTicketDTO;
  movie: Movie;
  room: Room;
  projectionType: ProjectionType;
  movieTickets: MovieTicket[] = [];
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
      console.log(this.movies);
    })
    this.movieTicketManagementService.getAllShowTime().subscribe(dataShowTime => {
      this.showTimes = dataShowTime;
      console.log(this.showTimes)
    })
    this.movieTicketManagementService.getAllProjectionType().subscribe(dataProjectionType => {
      this.projectionTypes = dataProjectionType;
    })
    this.formAddNewMovieTicket = this.formBuilder.group({
      room: ['', [Validators.required]],
      movie: ['',[Validators.required]],
      projectionType: ['', [Validators.required]],
      // showTime: this.formBuilder.array([]),
      showTime: [''],
      showDate: ['', [Validators.required]]
    })
  }

  addNewMovieTicket() {

    for (let showTime of this.selectedShowTimes) {
      this.formAddNewMovieTicket.patchValue({
        showTime: showTime
      })
      console.log(this.formAddNewMovieTicket.value);
      this.movieTickets.push(this.formAddNewMovieTicket.value);

    }
    console.log(this.movieTickets);
    this.movieTicketManagementService.createMovieTicket(this.movieTickets).subscribe(data => {
      document.getElementById('closeModal3').click();
      this.toast.success("Thêm mới thành công !", "Thông Báo ");
      console.log("data create" + data);
    }, error => {
      this.toast.error("Lỗi !", "Thông Báo ");
    })

  }

  onCheckboxChange(e, show) {
    // const showTime: FormArray = this.formAddNewMovieTicket.get('showTime') as FormArray;
    // if (e.target.checked) {
    //   showTime.push(new FormControl(e.target.value));
    // } else {
    //   let i: number = 0;
    //   showTime.controls.forEach((item: FormControl) => {
    //     if (item.value == e.target.value) {
    //       showTime.removeAt(i);
    //       return;
    //     }
    //     i++;
    //   });

    // }
    // console.log(showTime);
    console.log(show);
    console.log(e.target.checked);
    console.log(this.selectedShowTimes);
    if (e.target.checked) {
      this.selectedShowTimes.push(show);
      console.log(this.selectedShowTimes);
    }else {
     let index = this.selectedShowTimes.findIndex(s => s.showTimeId == show.showTimeId);
     console.log("no" +index);
     this.selectedShowTimes.splice(index, 1);
     console.log(this.selectedShowTimes);
    }
  }

  resetForm() {
    this.selectedShowTimes = [];
    this.formAddNewMovieTicket.reset();

  }
}
