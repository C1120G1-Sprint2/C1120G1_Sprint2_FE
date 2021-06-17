import { Component, OnInit } from '@angular/core';
import {Movie} from '../../../model/movie';
import {BookTicketsService} from '../../../service/member/book-tickets/book-tickets.service';
import {MovieManagementService} from '../../../service/admin/movie-management/movie-management.service';

@Component({
  selector: 'app-movie-selection',
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.scss']
})
export class MovieSelectionComponent implements OnInit {

  listDateTime: string[] = [];
  listShowtime: string[] = ["08:30","10:30","15:20","20:00"];
  listMovie: Movie[] = [];
  movie:Movie;
  startDate:Date;
  endDate:Date;
  diff:number;

  constructor(private bookTicketsService: BookTicketsService,
              private movieManagementService:MovieManagementService) { }

  ngOnInit(): void {
    this.bookTicketsService.getAllMovie().subscribe(data => {
      this.listMovie = data;
    }, error => {
      console.log("get "+error+" at getAllMovie() on MovieSelectionComponent");
    })
  }

  getDateTimeList(movieId: number) {
    this.listDateTime = [];
    if (this.listMovie != null) {
      for(let movie of this.listMovie) {
        if (movie.movieId == movieId) {
          this.movie = movie;
          break;
        }
      }
      this.startDate = new Date(this.movie.startDate);
      this.endDate = new Date(this.movie.endDate);

      if (this.endDate > this.startDate) {
        this.diff = this.endDate.getDate() - this.startDate.getDate();
        for(let i = 0; i <= this.diff; i++){
          this.listDateTime.push(this.startDate.toISOString().slice(0,10));
          this.startDate.setDate(this.startDate.getDate() + 1);
        }
      }
      console.log(this.listDateTime);
    }
  }
}
