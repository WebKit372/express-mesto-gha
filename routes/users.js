const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUsersId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUsersId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;
