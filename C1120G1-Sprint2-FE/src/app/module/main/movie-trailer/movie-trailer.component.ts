import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css']
})
export class MovieTrailerComponent implements OnInit {

  @Input()
  url: string = '';

  trailerUrl: any = '';

  @Output()
  closed = new EventEmitter<boolean>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.url += "?&autoplay=1";
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.url);
    console.log(this.trailerUrl);
  }

  closeTrailer() {
    this.closed.emit();
  }

}
