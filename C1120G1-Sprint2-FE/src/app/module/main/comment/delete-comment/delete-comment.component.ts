import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit {
  dataTemp = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data: string,
              private  dialogRef:MatDialogRef<DeleteCommentComponent>) {
    this.dataTemp = data;
  }

  ngOnInit(): void {

  }


  onConfirmClick(isDelete: boolean) {
    if (isDelete) {
      this.dialogRef.close(true);
    }else {
      this.dialogRef.close(false);
    }
  }
}
