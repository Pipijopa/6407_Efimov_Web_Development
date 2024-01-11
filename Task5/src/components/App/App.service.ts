export const fetchMovies = (url, params = null) => {
  return fetch(url, params).then((response) => response.json());
};
