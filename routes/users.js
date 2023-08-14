const userRouter = require('express').Router();
const validUpdateUser = require('../validInput/validUpdateUser');
const {
  updateUser,
  getUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
// Валидация запроса на обновление информации о пользователе
userRouter.patch('/me', validUpdateUser, updateUser);

module.exports = userRouter;
