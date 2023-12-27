const jwt = require('jsonwebtoken');
const TokenError = require('../errors/token-err');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    throw new TokenError('Неккоректное имя пользователя или пароль');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch {
    next(new TokenError('Неккоректное имя пользователя или пароль'));
  }
  req.user = payload;
  res.status(200).send({ message: 'Вы успешно авторизированы' });
  return next();
};
