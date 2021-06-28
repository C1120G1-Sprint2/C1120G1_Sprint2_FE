import {MovieStatus} from "./movieStatus";

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
  movieStatus: MovieStatus;
  banner: string;
  promote: number;
  description: string;
}
