const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUsersId,
  updateUser,
  updateUserAvatar,
  me,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', me);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
}), getUsersId);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
    // eslint-disable-next-line no-useless-escape, prefer-regex-literals
      .pattern(new RegExp("^http(s)?:\\/\\/(www\\.)?[\\w\\d\\-._~:\\/?#[\\]@!$&'()*+,;=]+#?$"))
      .required(),
  }),
}), updateUserAvatar);
module.exports = router;
