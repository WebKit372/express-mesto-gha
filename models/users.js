const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const TokenError = require('../errors/token-err');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          // eslint-disable-next-line no-useless-escape
          return /^http(s)?:\/\/(www\.)?[\w\d\-._~:\/?#[\]@!$&'()*+,;=]+#?$/.test(v);
        },
        message: 'Некорректный формат URL',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Некорректный формат электронной почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new TokenError('Неккоректное имя пользователя или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new TokenError('Неккоректное имя пользователя или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
