const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const errorStatus = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.getUsersId = (req, res) => {
  Users.findById(req.params.id)
    .orFail(() => new Error('NotFound'))
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send(errorStatus.castError);
      } else if (err.message === 'NotFound') {
        res.status(404).send(errorStatus.notFoundUser);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(errorStatus.validationError);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(errorStatus.validationError);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(errorStatus.validationError);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        })
        .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
module.exports.me = (req, res) => {
  Users.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ойойой' }));
};
