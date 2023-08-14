const { celebrate, Joi } = require('celebrate');

const validUpdateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = validUpdateUser;
