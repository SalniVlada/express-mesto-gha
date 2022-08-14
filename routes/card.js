const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), dislikeCard);

module.exports = router;
