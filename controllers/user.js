const User = require('../controllers/user');

// возвращает всех пользователей
module.exports.getUser = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// возвращает пользователя по _id
module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// создаёт пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// обновляет профиль
module.exports.findUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate( { name, about }, userId, { new: true, runValidators: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// обновляет аватар
module.exports.findUserAvatar = (req, res) => {
  const { link } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate( { link }, userId, { new: true, runValidators: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};