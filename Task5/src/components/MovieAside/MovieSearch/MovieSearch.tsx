import {useContext, useEffect, useState, useRef} from 'react';
import {MovieContext} from '../../../context/MovieContext';
import useDebounce from '../../../hooks/useDebounce';
import {fetchMovies} from '../../App/App.service';

import Button from '../../Button/Button';
import {Modal} from '../../Modal/Modal';
import styles from './MovieSearch.module.scss';

export const MovieSearch = () => {
  const [value, setValue] = useState('');
  const {debounceValue} = useDebounce(value, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {setMovies, filters, setFilters} = useContext(MovieContext);

  const anchor = useRef();

  const isHistoryFilterOn = !!filters.includes('History');
  const isDramaFilterOn = !!filters.includes('Drama');

  const toggleFilter = (filter: string) => {
    setFilters((prevFilters: string[]) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter);
      }

      return [...prevFilters, filter];
    });
  };

  useEffect(() => {
    fetchMovies(`http://localhost:3010/movies?title_like=${value}`).then((movies) => {
      setMovies(movies);
    });
  }, [debounceValue]);

  return (
    <form className={styles.form}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.control}
        type="text"
        name="search"
        placeholder="Введите название фильма"
      />

      <div ref={anchor}>
        <Button secondary type="button" onClick={() => setIsModalOpen(true)}>
          Искать
        </Button>
      </div>

      <Modal isOpen={isModalOpen} anchor={anchor} onClose={() => setIsModalOpen(false)}>
        <div style={{display: 'flex', gap: 8}}>
          <Button secondary={isDramaFilterOn} type="button" onClick={() => toggleFilter('Drama')}>
            Драма
          </Button>
          <Button secondary={isHistoryFilterOn} type="button" onClick={() => toggleFilter('History')}>
            История
          </Button>
        </div>
      </Modal>
    </form>
  );
};

export default MovieSearch;
