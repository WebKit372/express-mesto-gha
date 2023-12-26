const Cards = require('../models/cards');
const errorStatus = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send(errorStatus.default));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(errorStatus.validationError);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.id)
    .then((deletedCard) => {
      if (deletedCard.owner.toString() !== req.user._id) {
        return Promise.reject(new Error('Некорректный пользователь'));
      }
      return Cards.findByIdAndDelete(req.params.id)
        .orFail(() => new Error('NotFound'))
        .then((card) => res.send({ data: card }))
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(405).send({ data: err });
    });
};
module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send(errorStatus.castError);
      } else if (err.message === 'NotFound') {
        res.status(404).send(errorStatus.notFoundCard);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send(errorStatus.castError);
      } else if (err.message === 'NotFound') {
        res.status(404).send(errorStatus.notFoundCard);
      } else {
        res.status(500).send(errorStatus.default);
      }
    });
};
