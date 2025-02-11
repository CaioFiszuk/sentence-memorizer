const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUser, createUser, updateUser, updateAvatar, login, getAllUsers } = require('../controllers/users');

router.post('/signin', login);

router.post('/signup', createUser);

router.use(auth);

router.get('/me', getUser);
router.get('/', getAllUsers);
router.patch('/me', updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
