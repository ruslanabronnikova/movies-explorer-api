const { celebrate, Joi } = require('celebrate');
const { CorrectUrl } = require('../constants/correctUrl');
const validCreateMovie = celebrate({
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
})

module.exports = validCreateMovie;