const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { CorrectUrl } = require('../constants/correctUrl');
const {
  getMovie,
  createMovie,
  deleteMovieId,
} = require('../controllers/movies');

router.get('/', getMovie);
// Валидация запроса на создание карточки
router.post('/', celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(CorrectUrl).required(),
    trailerLink: Joi.string().pattern(CorrectUrl).required(),
    thumbnail: Joi.string().pattern(CorrectUrl).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// Валидация запроса на удаление карточки
router.delete('/:movieId', celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovieId);

module.exports = router;
