import React from 'react';
import {Movie} from '../../types/movie';
import styles from './MovieInfo.module.scss';

interface IMovieInfo {
  currentMovie: Movie;
}

const MovieInfo: React.FC<IMovieInfo> = ({currentMovie}) => {
  const {title, year, director, actors, plot, posterUrl, runtime, genres, id} = currentMovie;

  const imgError = (event) => {
    event.target.src = 'https://via.placeholder.com/168x250';
  };

  return (
    <section className={styles.container}>
      <div className={styles.movieInfoHeader}>
        <span>id: {id}</span>
        <button>Редактировать</button>
      </div>

      <div className={styles.movieInfoBody}>
        <img onError={imgError} width={'150'} height={'250'} src={posterUrl} alt={'Film poster'} />

        <div className={styles.containerInfo}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.director}>{director}</span>
          </div>

          <div>
            <h3 className={styles.titleInfo}>Параметры</h3>
            <MovieInfoRow title={'Год производства'} value={year} />
            <MovieInfoRow title={'Актеры'} value={actors} />
            <MovieInfoRow title={'Длительность фильма'} value={`${runtime} мин.`} />
            <MovieInfoRow
              title={'Жанры'}
              value={genres.map((genre) => (
                <span key={genre} className={styles.genre}>
                  {genre}
                </span>
              ))}
            />
          </div>
        </div>
      </div>

      <div>
        <h3>Описание</h3>
        <span>{plot}</span>
      </div>
    </section>
  );
};

const MovieInfoRow = ({title, value}) => {
  return (
    <div className={styles.rowContainer}>
      <div className={styles.rowTitle}>{title}:</div>
      <div className={styles.rowValue}>{value}</div>
    </div>
  );
};

export default MovieInfo;
