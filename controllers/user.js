const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { errorMessage } = require('../utils/errorMessage');
const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const { CREATED, OK } = require('../utils/successes');

// возвращает всех пользователей
module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

// возвращает информацию о текущем пользователе
module.exports.getUserMe = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Пользователь с таким id не найден');
    })
    .then((user) => res.status(OK).send(user))
    .catch((err) => errorMessage(err, req, res));
};

// возвращает пользователя по _id
module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, req, res));
};

// создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => errorMessage(err, req, res, next));
};

// обновляет профиль
module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, req, res));
};

// обновляет аватар
module.exports.findUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

// получает по запросу почту или пароль и проверяет их
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ jwt: token });
    })
    .catch(next);
};
