export interface Movie {
  id: string;
  title: string;
  year: string;
  runtime: string;
  genres: ReadonlyArray<string>;
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

export type TMovieList = ReadonlyArray<Movie>;

export interface MovieView extends Movie {
  selected: boolean;
}

export type MovieViewList = ReadonlyArray<MovieView>;
