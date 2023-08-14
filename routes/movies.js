const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validCreateMovie = require('../validInput/validCreateMovie');
const validDelMovie = require('../validInput/validDelMovie');
const {
  getMovie,
  createMovie,
  deleteMovieId,
} = require('../controllers/movies');

movieRouter.get('/', getMovie);
// Валидация запроса на создание карточки
movieRouter.post('/', validCreateMovie, createMovie);

// Валидация запроса на удаление карточки
movieRouter.delete('/:movieId', validDelMovie, deleteMovieId);

module.exports = movieRouter;
