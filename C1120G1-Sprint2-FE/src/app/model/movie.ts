import {MovieCategory} from "./movieCategory";

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
  movieStatus: number;
  banner: string;
  promote: boolean;
  description: string;
  movieCategorySet: MovieCategory[];
  categories: string;

}
