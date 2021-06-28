import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailMovieService} from '../../../service/detail-movie/detail-movie.service';
import {Movie} from '../../../model/movie';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {Category} from '../../../model/category';
import {MatDialog} from '@angular/material/dialog';
import {CommentServiceService} from '../../../service/comment/comment-service/comment-service.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Comments} from '../../../model/comment';
import {DeleteCommentComponent} from '../comment/delete-comment/delete-comment.component';
import {DatePipe} from '@angular/common';
import {MemberManagementService} from '../../../service/admin/member-management/member-management.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})

export class DetailMovieComponent implements OnInit {
  movie: Movie;
  formComment: FormGroup;
  categories: Category[];
  comments: Comments[];
  public date = new Date();
  user: Observable<any>;
  movie1: Observable<any>;
  idCommentEdit = 0;
  contentCommentEdit: any;
  loading = false;
  id: number;
  email: string = '';
  size: number = 5;
  page: [];
  idUser: number;




  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private detailMovieService: DetailMovieService,
              private toastr: ToastrService,
              private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private commentService: CommentServiceService,
              private formBuilder: FormBuilder,
              private tokenService: TokenStorageService,
              private datePipe : DatePipe,
              private memberService: MemberManagementService,
              ) {

  }
  videoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer);
  }


  ngOnInit(): void {
    
   let id = this.activatedRoute.snapshot.params['id'];
    this.detailMovieService.getMovieById(id).subscribe(data => {
      this.movie = data;
      console.log(data);
      console.log(id);
      this.detailMovieService.getCategoryBiMovieId(id).subscribe(dataCategory => {
        this.categories = dataCategory;
        console.log(dataCategory);
      })
      this.commentService.getAllCommentByMovieId(id).subscribe(dataComment => {
        this.comments = dataComment;
        console.log(this.comments);
      })
      console.log(data);
    }, error => {
      this.toastr.error("Not found film", "Notification");
    })
    this.formComment = this.formBuilder.group({
      content: ['']
    })


  }



  onSubmitNewComment() {
    this.loading = true;
    if (this.formComment.valid) {
      this.commentService.addComment(this.formComment.value, this.id).subscribe(data => {
        console.log(this.id);
        this.toastr.success("Add new comment", "Notification");
        this.loading = false;
        this.ngOnInit();
      })
    }
  }

  editComment(comment: any) {
    this.idCommentEdit = comment.id;
    this.contentCommentEdit = comment.content;
  }

  deleteComment(comment: any) {
    const dialogRef = this.dialog.open(DeleteCommentComponent, {
      data: "comment"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      // if (confirmed) {
      //   if(this.id == comment.commentId) {
      //     this.commentService.deleteCommentByUser(comment.commentId).subscribe(data=> {
      //       this.toastr.success("delete complete", "Notification");
      //
      //       this.ngOnInit();
      //     });
      //   } else {
      //     this.toastr.error("Error !", "Notification");
      //   };
      // }
      if (confirmed) {
        this.commentService.deleteCommentByUser(comment.commentId).subscribe(dataDelete => {
          this.toastr.success("Delete complete", "Notification");
          console.log(dataDelete);
        })
      }
    }, error => {
      this.toastr.error("Error !", "Notification");
    }, ()=> {
      this.loading = false;
    });
  }

  updateComment(comment: any) {
    // if(comment.user.email == this.email) {
    //   this.commentService.updateComment(this.idCommentEdit, this.contentCommentEdit).subscribe(data=> {
    //     this.toastr.success("Update complete !", "Notification");
    //     this.contentCommentEdit="";
    //     this.idCommentEdit=0;
    //     this.ngOnInit();
    //   },error => {
    //     this.toastr.error("Error !", "Notification");
    //   })
    // }
    if (comment.commentId == this.idCommentEdit) {
    this.commentService.updateComment(this.idCommentEdit, this.contentCommentEdit).subscribe(dataEdit => {
      this.toastr.success("Update complete !", "Notification");
      this.contentCommentEdit ="";
      this.contentCommentEdit = 0;
      this.ngOnInit();
    }, error => {
      this.toastr.error("Error !", "Notification");
    })
    }
  }


  viewProfile(email: string) {

  }

  onSubmit() {

  }

  cancel() {

  }
}
