const { getUser, createUser, findUserById, findUserInfo, findUserAvatar } = require('../controllers/user');

router.get('/', getUser);
router.get('/:userId', findUserById);
router.post('/', createUser);
router.patch('/me', findUserInfo);
router.patch('/me/avatar', findUserAvatar);