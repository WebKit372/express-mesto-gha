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
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
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
