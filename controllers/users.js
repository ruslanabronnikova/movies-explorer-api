const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequest = require('../classErrors/BadRequest');
const NotFound = require('../classErrors/NotFound');
const UnAuthorized = require('../classErrors/UnAuthorized');
const Conflict = require('../classErrors/Conflict');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })

        .then(() => res.status(200).send({
          name, email,
        }))
        .catch((error) => {
          if (error.code === 11000) {
            next(new Conflict('Пользователь с таким электронным адресом уже зарегистрирован'));
          } else if (error.name === 'ValidationError') {
            next(new BadRequest('Невалидные данные'));
          } else {
            next(error);
          }
        });
    })
    .catch((error) => {
      next((error));
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnAuthorized('Неправильные почта или пароль');
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnAuthorized('Неправильные почта или пароль');
          const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          return res.send({ JWT: token });
        });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ user });
      }
      throw new NotFound('Пользователь с указанным id не найден');
    })
    .catch((error) => {
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  console.log('lflflfl', name, email)

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) throw new NotFound('Пользователь с указанным id не найден');
      res.status(200).send(updatedUser);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  createUser,
  updateUser,
  loginUser,
  getUserInfo,
};
