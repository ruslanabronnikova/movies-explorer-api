const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
// Валидация запроса на обновление информации о пользователе
router.patch('/me', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

module.exports = router;
