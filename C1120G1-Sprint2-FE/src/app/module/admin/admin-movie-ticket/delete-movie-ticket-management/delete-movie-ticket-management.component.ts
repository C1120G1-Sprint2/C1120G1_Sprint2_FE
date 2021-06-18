import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieManagementService} from '../../../../service/employee/movie-management/movie-management.service';
import {Router} from '@angular/router';
import {MovieTicketManagementService} from '../../../../service/admin/movie-ticket-management/movie-ticket-management.service';

@Component({
  selector: 'app-delete-movie-ticket-management',
  templateUrl: './delete-movie-ticket-management.component.html',
  styleUrls: ['./delete-movie-ticket-management.component.css']
})
export class DeleteMovieTicketManagementComponent implements OnInit {
  @Input()
  deleteName: String;

  @Input()
  deleteId: number
  @Output()
  deleteComplete = new EventEmitter<boolean>();
  constructor(private movieTicketManagementService: MovieTicketManagementService,
              private router: Router) { }

  ngOnInit(): void {
  }


  deletePatient() {
    this.movieTicketManagementService.deleteMovieTicket(this.deleteId).subscribe(data => {
      document.getElementById('closeModal1').click();
      this.deleteComplete.emit(true);
      console.log(data);
    })
  }
}
