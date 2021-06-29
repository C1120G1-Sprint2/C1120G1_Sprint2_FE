import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieDTO} from '../../../../model/dto/movieDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieManagementService} from '../../../../service/admin/movie-management/movie-management.service';
import {Movie} from '../../../../model/movie';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrService} from 'ngx-toastr';


// @ts-ignore
@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  public movieId: number;
  public formEditMovie: FormGroup;
  public imagePoster = null;
  public selectedImage: any = null;
  public endDateCompare = '';
  public startDateCompare = '';
  public listMovieDTO: MovieDTO[] = [];
  public movie: Movie;
  private messageImageError: string;
  private image: any;

  constructor(
    private movieService: MovieManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toast: ToastrService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {

    this.movieId = this.activatedRoute.snapshot.params['movieId'];

    this.formEditMovie = new FormGroup({
      movieId: new FormControl(''),
      movieName: new FormControl('', [Validators.required]),
      posterMovie: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      movieStudio: new FormControl('', [Validators.required]),
      actor: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required]),
      movieLength: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required])
    });

    this.movieService.getMovieById(this.movieId).subscribe(movie => {
      this.formEditMovie.controls.movieId.setValue(movie.movieId);
      this.formEditMovie.controls.movieName.setValue(movie.movieName);
      this.formEditMovie.controls.posterMovie.setValue(movie.posterMovie);
      this.imagePoster = movie.posterMovie;
      this.formEditMovie.controls.startDate.setValue(movie.startDate);
      this.formEditMovie.controls.endDate.setValue(movie.endDate);
      this.formEditMovie.controls.movieStudio.setValue(movie.movieStudio);
      this.formEditMovie.controls.actor.setValue(movie.actor);
      this.formEditMovie.controls.director.setValue(movie.director);
      this.formEditMovie.controls.movieLength.setValue(movie.movieLength);
      this.formEditMovie.controls.trailer.setValue(movie.trailer);

      console.log(this.formEditMovie);
    });
  }

  submit() {
    this.endDateCompare = this.formEditMovie.value.endDate;
    this.startDateCompare = this.formEditMovie.value.startDate;
    if (this.endDateCompare < this.startDateCompare) {
      this.toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
      // tslint:disable-next-line:triple-equals
    } else if (this.startDateCompare == this.endDateCompare) {
      this.toast.error('Ngày bắt đầu và  ngày kết thúc không được trùng nhau');
    } else {
      if (this.imagePoster !== this.formEditMovie.value.posterMovie) {
        const name = this.selectedImage.name;
        const stringImage = name.substring(name.length - 3).toLowerCase();
        if (stringImage === 'png' || stringImage === 'jpg') {
          const fileName = 'imageMovie/' + name;
          const fileRef = this.storage.ref(fileName);
          this.storage.upload(fileName, this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                  this.formEditMovie.value.posterMovie = url;
                  console.log(this.formEditMovie.value);
                  this.movieService.formEditMovie(this.formEditMovie.value).subscribe(data => {
                    this.toast.success('Sửa thành công!');
                    this.router.navigate(['/admin/movie/movie-list']);
                  });
                }
              );
            })).subscribe();
        }
      } else {
        this.movieService.formEditMovie(this.formEditMovie.value).subscribe(data => {
          this.toast.success('Sửa thành công!');
          this.router.navigate(['/admin/movie/movie-list']);
        });
      }
    }
  }

  removeImage() {
    this.imagePoster = null;
    this.selectedImage = null;
  }

  showImage(image) {
    if (image.target.files && image.target.files[0]) {
      const file = image.target.files[0].name;
      const path = file.substring(file.length - 3).toLowerCase();
      if (path === 'png' || path === 'jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePoster = e.target.result;
        reader.readAsDataURL(image.target.files[0]);
        this.selectedImage = image.target.files[0];
        this.messageImageError = '';
      } else {
        this.imagePoster = null;
        this.messageImageError = '*Tệp ảnh bạn chọn không hợp lệ!';
        this.selectedImage = null;
      }
    } else {
      this.selectedImage = null;
      this.messageImageError = '*Không được bỏ trống ảnh';
    }
  }
}
