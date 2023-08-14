const { celebrate, Joi } = require('celebrate');

const validAuth = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
})

module.exports = validAuth;