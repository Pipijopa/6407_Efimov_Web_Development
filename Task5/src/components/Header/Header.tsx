import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Админка фильмотеки</div>
        <div className={styles.author}>Ефимов Иван 6407</div>
      </div>
    </header>
  );
};
