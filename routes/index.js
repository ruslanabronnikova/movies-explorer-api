const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');

const authMiddleW = require('../middlewares/authMiddleW');

const validAuth = require('../validInput/validAuth');
const validLogin = require('../validInput/validLogin');

const userRouter = require('./users');
const movieRouter = require('./movies');

// Валидация запроса на вход (логин) пользователя
router.post('/signin', validLogin, loginUser);

// Валидация запроса на регистрацию нового пользователя
router.post('/signup', validAuth, createUser);

router.use(authMiddleW);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
