import { Injectable } from '@angular/core';
// import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Rating} from '../../model/rating';

export interface Star {
  userId: any,
  movieId: any,
  value:number;
}
@Injectable({
  providedIn: 'root'
})


export class RatingService {

  constructor(private afs: AngularFirestore) { }

  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId));
    return starsRef.valueChanges();
  }

  getMovieStars(movieId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('movieId', '==', movieId));
    return starsRef.valueChanges();
  }

  // create or update star
  setStar(userId, movieId, value) {
    //star document data
    const  star: Star = {userId, movieId, value};

    // custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.movieId}`;
    // set data, return promise
    return this.afs.doc(starPath).set(star);
  }
}
