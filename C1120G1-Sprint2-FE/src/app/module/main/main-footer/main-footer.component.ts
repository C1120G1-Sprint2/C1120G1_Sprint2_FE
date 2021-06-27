import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showMap(event) {
    event.preventDefault();
    $('#content-map').slideToggle();
    $('.map-trigger').toggleClass('show');
    if ($('.map-trigger').hasClass('show')) {
      $('html,body').animate({
        scrollTop: $('#content-map').offset().top
      }, 500);
    }
  }

}
