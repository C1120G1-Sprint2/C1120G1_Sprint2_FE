import {MovieCategory} from "./movieCategory";
import {Status} from 'tslint/lib/runner';

export interface Movie {
  movieId: number;
  posterMovie: string;
  movieName: string;
  startDate: string;
  endDate: string;
  movieStudio: string;
  actor: string;
  director: string;
  movieLength: number;
  trailer: string;
  status: Status;
  banner: string;
  promote: boolean;
  description: string;
  movieCategorySet: MovieCategory[];
  categories: string;
}
