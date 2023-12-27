const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorCatcher = require('./middlewares/errorCatcher');
const NotFoundError = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/signup', celebrate({
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
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), login);
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});
app.use(errors());
app.use(errorCatcher);
app.listen(PORT, () => {
});
