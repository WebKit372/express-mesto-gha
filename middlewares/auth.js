const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
