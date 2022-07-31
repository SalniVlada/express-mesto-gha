const router = require('express').Router();
const { getUser, createUser, findUserById, changeUserInfo, findUserAvatar } = require('../controllers/user');

router.get('/', getUser);
router.get('/:userId', findUserById);
router.post('/', createUser);
router.patch('/me', changeUserInfo);
router.patch('/me/avatar', findUserAvatar);

module.exports = router;