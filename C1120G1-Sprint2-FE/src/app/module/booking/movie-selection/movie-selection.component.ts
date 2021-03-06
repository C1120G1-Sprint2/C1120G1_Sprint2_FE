import {Component, Injectable, OnInit} from '@angular/core';
import {Movie} from '../../../model/movie';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {MovieManagementService} from '../../../service/admin/movie-management/movie-management.service';
import {ShowTime} from '../../../model/showTime';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-movie-selection',
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.scss']
})
export class MovieSelectionComponent implements OnInit {

  listDateTime: string[] = [];
  listShowtime: ShowTime[] = [];
  listMovie: Movie[] = [];
  movie:Movie;

  date:string = '';
  showTimeId:number;
  startDate:Date;
  endDate:Date;
  diff:number;
  public activeId = null;

  constructor(private bookTicketsService: BookTicketsService,
              private movieManagementService:MovieManagementService,
              private tokenStorageService:TokenStorageService,
              private router:Router) { }

  ngOnInit(): void {

    this.bookTicketsService.getAllMovie().subscribe(data => {
      this.listMovie = data;
    }, error => {
      console.log("get " + error + " at getAllMovie() on MovieSelectionComponent");
    })
  }

  getDateTimeList(movieId: number) {
    this.listDateTime = [];
    this.activeId = movieId;
    if (this.listMovie != null) {
      for(let movie of this.listMovie) {
        if (movie.movieId == movieId) {
          this.movie = movie;
          break;
        }
      }
      this.startDate = (new Date(this.movie.startDate) > new Date()) ? new Date(this.movie.startDate) : new Date();
      this.endDate = new Date(this.movie.endDate);

      if (this.endDate > this.startDate) {
        this.diff = this.endDate.getDate() - this.startDate.getDate();
        for(let i = 0; i <= this.diff; i++){
          this.listDateTime.push(this.startDate.toISOString().slice(0,10));
          this.startDate.setDate(this.startDate.getDate() + 1);
        }
      }
    }
  }

  getShowTimeList(date: string) {
    this.date = date;
    this.listShowtime = [];
    this.bookTicketsService.getAllShowTime(date, this.movie.movieId).subscribe(data => {
      this.listShowtime = data;
      console.log(this.listShowtime)
    }, error => {
      console.log("get "+error +" at getAllShowTime() on MovieSelectionComponent");
    })
  }

  getMovieTicket() {
    this.bookTicketsService.getMovieTicket(this.movie.movieId, this.date, this.showTimeId).subscribe(data => {
      this.bookTicketsService.movieTicket = data;
      this.router.navigate(['booking/seat'], {
          queryParams: {
            movieTicketId: data.movieTicketId
          }
        }
      ).then();
    }, error => {
      console.log("get "+error+" at getMovieTicket() on MovieSelectionComponent");
    });
  }
}
