import React, {useContext} from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.scss';
import {MovieContext} from '../../../context/MovieContext';
import {Link, useParams} from 'react-router-dom';

export const MovieList = () => {
  const {movies} = useContext(MovieContext);
  const {id} = useParams();

  return (
    <ul className={styles.container}>
      {movies.map((movie, index) => (
        <li className={styles.listItem} key={index}>
          <Link to={`movie/${movie.id}`}>
            <MovieCard card={movie} active={movie.id == id} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
