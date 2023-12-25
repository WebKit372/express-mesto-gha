const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorisation } = req.headers;
  if (!authorisation || !authorisation.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorisation.replace('Bearer ', '');
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
