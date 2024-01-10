import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {fetchMovies} from '../components/App/App.service';
import styles from '../components/MovieInfo/MovieInfo.module.scss';

const MovieInfo: React.FC = () => {
  const {id} = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    fetchMovies(`http://localhost:3010/movies/${id}`)
      .then((movie) => {
        setCurrentMovie(movie);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (currentMovie == null) return null;

  const imgError = (event) => {
    event.target.src = 'https://via.placeholder.com/160x250'
  }

  return (
    <section className={styles.container}>
      <div className={styles.movieInfoHeader}>
        <span>id: {id}</span>
        <Link to={`/movie/${id}/edit`}>Редактировать</Link>
      </div>

      <div className={styles.movieInfoBody}>
        <img onError={imgError} width={'150'} height={'250'} src={currentMovie.posterUrl} alt={'Film poster'} />

        <div className={styles.containerInfo}>
          <div>
            <h2 className={styles.title}>{currentMovie.title}</h2>
            <span className={styles.director}>{currentMovie.director}</span>
          </div>

          <div>
            <h3 className={styles.titleInfo}>Параметры</h3>
            <MovieInfoRow title={'Год производства'} value={currentMovie.year} />
            <MovieInfoRow title={'Актеры'} value={currentMovie.actors} />
            <MovieInfoRow title={'Длительность фильма'} value={`${currentMovie.runtime} мин.`} />
            <MovieInfoRow
              title={'Жанры'}
              value={currentMovie.genres.map((genre) => (
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
        <span>{currentMovie.plot}</span>
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
