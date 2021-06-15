import {User} from './user';
import {Movie} from './movie';

export interface Rating {
  ratingId: number;
  rating: number;
  user: User;
  movie: Movie;
}
