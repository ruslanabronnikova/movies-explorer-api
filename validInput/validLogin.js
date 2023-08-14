const { celebrate, Joi } = require('celebrate');

const validLogin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
})

module.exports = validLogin;