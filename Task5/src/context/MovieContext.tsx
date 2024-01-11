import React, {createContext, useEffect, useState, useMemo} from 'react';
import {fetchMovies} from '../components/App/App.service';
import {TMovieList} from '../types/movie';

export const MovieContext = createContext<any>(null);

export const MovieContextProvider = ({children}) => {
  const [movies, setMovies] = useState<TMovieList>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState([]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return filters.every((filter) => movie.genres.includes(filter));
    });
  }, [movies, filters]);

  useEffect(() => {
    setLoading(true);

    fetchMovies('http://localhost:3010/movies')
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const contextValue = {
    movies: filteredMovies,
    setMovies,
    filters,
    setFilters,
    isLoading,
    error,
  };

  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};
