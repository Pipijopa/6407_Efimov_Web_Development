import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchMovies} from '../components/App/App.service';
import Button from '../components/Button/Button';
import { useNavigate } from "react-router-dom"

const MovieEdit = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const navigateMovie = (event) => {
    event.preventDefault();
    console.log(form)
    fetchMovies(`http://localhost:3010/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...form}),
    }).then(() => console.log('success updated'));
    navigate(`/movie/${id}`);
  };

  const [form, setForm] = useState({
    title: '',
    year: '',
    runtime: '',
    actors: '',
    plot: '',
    posterUrl: '',
    genres: []
  });

  useEffect(() => {
    fetchMovies(`http://localhost:3010/movies/${id}`).then((movie) => {
      setForm(movie);
    });
  }, [id]);

  const onChangeForm = (e) => setForm({...form, [e.target.name]: e.target.value});
  const onChangeFormGenres = (e) => setForm({...form, [e.target.name]: splitGenres(e.target.value)});
  const splitGenres = (value) => {
    return value.split(',')
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    console.log(form)
    fetchMovies(`http://localhost:3010/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...form}),
    }).then(() => console.log('success updated'));
  };


  return (
    <form onSubmit={onSubmitForm}>
      <Input onChange={onChangeForm} value={form.title} name={'title'} />
      <Input onChange={onChangeForm} value={form.year} name={'year'} />
      <Input onChange={onChangeForm} value={form.runtime} name={'runtime'} />
      <Input onChange={onChangeForm} value={form.actors} name={'actors'} />
      <Input onChange={onChangeForm} value={form.plot} name={'plot'} />
      <Input onChange={onChangeForm} value={form.posterUrl} name={'posterUrl'} />
      <Input onChange={onChangeFormGenres} value={form.genres} name={'genres'} />
      <Button type={'submit'} onClick={navigateMovie}>Сохранить</Button>
    </form>
  );
};

const nameField = {
  title: 'Название',
  year: 'Год выпуска',
  runtime: 'Продолжительность',
  actors: 'Актеры',
  plot: 'Описание',
  posterUrl: 'Ссылка на постер',
  genres: 'Жанры'
};

const Input = ({name, value, onChange}) => {
  return (
    <>
      <h5>{nameField[name]}</h5>
      <input name={name} value={value} onChange={onChange} />
    </>
  );
};

export default MovieEdit;