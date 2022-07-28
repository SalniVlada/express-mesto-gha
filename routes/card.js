const { getCard, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/user');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);