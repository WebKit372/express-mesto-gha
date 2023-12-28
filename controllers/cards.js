const Cards = require('../models/cards');
const errorStatus = require('../utils/constants');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const DeleteError = require('../errors/delete-err');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorStatus.validationError));
      } else {
        next(err);
      }
    });
};
module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.id)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((deletedCard) => {
      if (deletedCard.owner.toString() !== req.user._id) {
        throw new DeleteError('Недостаточно прав');
      }
      res.send({ data: deletedCard });
      deletedCard.deleteOne();
    })
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(errorStatus.castError));
      } else {
        next(err);
      }
    });
};
module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(errorStatus.castError));
      } else {
        next(err);
      }
    });
};
