const Card = require('../controllers/card');

// возвращает все карточки
module.exports.getCard = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  User.create({ name, link, owner: ownerId })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

// удаляет карточку по идентификатору
module.exports.deleteCard((req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

// поставить лайк карточке
module.exports.likeCard((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

// убрать лайк с карточки
module.exports.dislikeCard((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
      { $pul: { likes: req.user._id } },
      { new: true },
    )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
})