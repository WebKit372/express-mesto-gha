const { celebrate, Joi } = require('celebrate');

module.exports.cardIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
});
module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
    // eslint-disable-next-line no-useless-escape, prefer-regex-literals
      .pattern(new RegExp("^http(s)?:\\/\\/(www\\.)?[\\w\\d\\-._~:\\/?#[\\]@!$&'()*+,;=]+#?$"))
      .required(),
  }),
});
module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
});
module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
  }),
});
module.exports.userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
    // eslint-disable-next-line no-useless-escape, prefer-regex-literals
      .pattern(new RegExp("^http(s)?:\\/\\/(www\\.)?[\\w\\d\\-._~:\\/?#[\\]@!$&'()*+,;=]+#?$"))
      .required(),
  }),
});
module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
    // eslint-disable-next-line no-useless-escape, prefer-regex-literals
      .pattern(new RegExp("^http(s)?:\\/\\/(www\\.)?[\\w\\d\\-._~:\\/?#[\\]@!$&'()*+,;=]+#?$")),
    about: Joi.string()
      .min(2)
      .max(30),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
});
module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
});
