import React from 'react';
import styles from './PlugNotSelectMovie.module.scss';

export const PlugNotSelectMovie = () => {
  return (
    <div className={styles.container}>
      <span className={styles.placeholder}>Выберите фильм</span>
    </div>
  );
};
