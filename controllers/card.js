const Card = require('../models/card');
const { errorMessage } = require('../utils/errorMessage');
const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const { FORBIDDEN_ERROR } = require('../errors/forbiddenError');
const { CREATED } = require('../utils/successes');

// возвращает все карточки
module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};

// создаёт карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};

// удаляет карточку по идентификатору
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new FORBIDDEN_ERROR('Эту карточку нельзя удалить');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};

// поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};
