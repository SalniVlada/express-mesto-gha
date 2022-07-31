const User = require('../models/user');
const { errorMessage } = require('../utils/errorMessage');

// возвращает всех пользователей
module.exports.getUser = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => errorMessage(err, req, res));
};

// возвращает пользователя по _id
module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then(user => res.send(user))
    .catch(err => errorMessage(err, req, res));
};

// создаёт пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => errorMessage(err, req, res));
};

// обновляет профиль
module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  console.log(req.user);
  console.log(req.body);
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.send(user))
    .catch(err => errorMessage(err, req, res));
};

// обновляет аватар
module.exports.findUserAvatar = (req, res) => {
  const { link } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { link }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.send({ data: user }))
    .catch(err => errorMessage(err, req, res));
};