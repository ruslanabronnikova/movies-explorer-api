const { celebrate, Joi } = require('celebrate');

const validDelMovie = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
})

module.exports = validDelMovie;