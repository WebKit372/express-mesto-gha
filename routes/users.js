const router = require('express').Router();
const {
  getUsers,
  getUsersId,
  updateUser,
  updateUserAvatar,
  me,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', me);
router.get('/:id', getUsersId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;
