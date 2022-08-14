const { BAD_REQUEST_ERROR } = require('../errors/badRequestError');
const { CONFLICT_ERROR } = require('../errors/conflictError');

const errorMessage = (err, req, res, next) => {
  if (err.name === 'CastError') {
    next(new BAD_REQUEST_ERROR('Переданы некорректные данные'));
  }

  if (err.name === 'ValidationError') {
    next(new BAD_REQUEST_ERROR('Переданы некорректные данные'));
  }

  if (err.code === 11000) {
    next(new CONFLICT_ERROR('Пользователь с таким email уже существует'));
  }

  next(err);
};

module.exports = { errorMessage };
