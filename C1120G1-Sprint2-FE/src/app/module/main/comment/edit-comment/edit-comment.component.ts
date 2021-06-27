import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {CommentServiceService} from '../../../../service/comment/comment-service/comment-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  formEdit: FormGroup;

  public date = new Date();
  selectedImg: any;
  imgSrc = null;
  selectedImage: any;
  isCheck = false;
  constructor(private commentService: CommentServiceService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditCommentComponent>) { }

  ngOnInit(): void {

  }



}
