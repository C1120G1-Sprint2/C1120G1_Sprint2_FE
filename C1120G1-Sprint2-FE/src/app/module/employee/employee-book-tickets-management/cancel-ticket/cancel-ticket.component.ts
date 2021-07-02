import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookTicketsManagementService} from '../../../../service/employee/book-tickets-management/book-tickets-management.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cancel-ticket',
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.css']
})
export class CancelTicketComponent implements OnInit {
  @Input()
  cancelId: number;
  @Output()
  cancelComplete = new EventEmitter<boolean>();

  constructor(private bookTicketService: BookTicketsManagementService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {

  }

  onCancel() {
    this.bookTicketService.cancelTicket(this.cancelId).subscribe(data  => {
      document.getElementById('closeModal').click();
      this.cancelComplete.emit(true);
    });
    this.toastr.success('Huỷ Thành Công', 'Vé Đã Đặt');
  }

}
