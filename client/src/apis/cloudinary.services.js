// src/api/service.js

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api'
  // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = err => {
  throw err;
};

const handleUpload = file => {
  return service
    .post('/upload', file)
    .then(res => res.data)
    .catch(errorHandler);
};

const saveNewMovie = newMovie => {
  return service
    .post('/movies/create', newMovie)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  service,
  handleUpload,
  saveNewMovie
};
