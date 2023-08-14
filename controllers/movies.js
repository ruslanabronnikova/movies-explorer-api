const Movie = require('../models/movie');

const BadRequest = require('../classErrors/BadRequest');
const ForBidden = require('../classErrors/ForBidden');
const NotFound = require('../classErrors/NotFound');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })

    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Невалидные данные'));
      } else {
        next(error);
      }
    });
};

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((error) => {
      next(error);
    });
};

const deleteMovieId = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFound('Фильм с указанным _id не найден.');

      if (!movie.owner.equals(userId)) throw new ForBidden('Нет прав доступа');

      // Удаляем фильм на втором этапе после проверки прав доступа
      return movie.deleteOne();
    })
    .then(() => res.status(200).send({ message: 'Фильм успешно удален' }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Невалидные данные'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovieId,
};
