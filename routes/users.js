const router = require('express').Router();
const {
  getUsers,
  getUsersId,
  updateUser,
  updateUserAvatar,
  me,
} = require('../controllers/users');
const { userIdValidation, userInfoValidation, userAvatarValidation } = require('../utils/validationConfig');

router.get('/', getUsers);
router.get('/me', me);
router.get('/:id', userIdValidation, getUsersId);
router.patch('/me', userInfoValidation, updateUser);
router.patch('/me/avatar', userAvatarValidation, updateUserAvatar);
module.exports = router;
