const jwt = require('jsonwebtoken');
const TokenError = require('../errors/token-err');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    throw new TokenError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch {
    next(new TokenError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
