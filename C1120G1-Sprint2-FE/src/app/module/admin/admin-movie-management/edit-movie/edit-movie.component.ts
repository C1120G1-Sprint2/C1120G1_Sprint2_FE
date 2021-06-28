import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  formEditMovie: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  submit(formEditMovie) {

  }
}
