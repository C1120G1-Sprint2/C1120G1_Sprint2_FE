import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RatingService} from '../../../service/rating/rating.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() userId;
  @Input() movieId;
  stars: Observable<any>;
  avgRating: Observable<any>;
  constructor(private ratingService: RatingService) {}

  ngOnInit() {
    this.stars = this.ratingService.getMovieStars(this.movieId);

    this.avgRating = this.stars.pipe(map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    }))
  }

  starHandler(value) {
    this.ratingService.setStar(this.userId, this.movieId, value);
  }



}
