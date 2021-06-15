import {User} from './user';
import {Movie} from './movie';

export interface Comment {
  commentId: number;
  content: string;
  user: User;
  movie: Movie;
}
