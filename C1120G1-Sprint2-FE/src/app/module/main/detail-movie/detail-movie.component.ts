import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailMovieService} from '../../../service/detail-movie/detail-movie.service';
import {Movie} from '../../../model/movie';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})

export class DetailMovieComponent implements OnInit {
  movie: Movie;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private detailMovieService: DetailMovieService,
              private toastr: ToastrService,
              ) {

  }


  ngOnInit(): void {
    let index = this.activatedRoute.snapshot.params['id'];
    this.detailMovieService.getMovieById(index).subscribe(data => {
      this.movie = data;
      console.log(data);
    }, error => {
      this.toastr.error("Not found film", "Notification");
    })
  }

  onSubmit() {
    this.router.navigateByUrl("/api/ticket");
  }
}
