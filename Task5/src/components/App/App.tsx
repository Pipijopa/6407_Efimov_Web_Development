import React from 'react';
import 'normalize.css';
import './App.module.scss';
import MovieInfo from '../../pages/MovieInfo';
import {Main} from '../Main/Main';
import {MovieContextProvider} from '../../context/MovieContext';
import {Routes, Route} from 'react-router-dom';
import MovieEdit from '../../pages/MovieEdit';

function App() {
  return (
    <MovieContextProvider>
      <Routes>
        <Route element={<Main />} path={'/*'}>
          <Route path={'movie/:id'} element={<MovieInfo />}></Route>
          <Route path={'movie/:id/edit'} element={<MovieEdit />}></Route>
        </Route>
      </Routes>
    </MovieContextProvider>
  );
}

export default App;
