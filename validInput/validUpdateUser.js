const { celebrate, Joi } = require('celebrate');

const validUpdateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email()
  }),
});

module.exports = validUpdateUser;
