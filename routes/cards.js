const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardIdValidation, createCardValidation } = require('../utils/validationConfig');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', cardIdValidation, deleteCard);
router.put('/:id/likes', cardIdValidation, likeCard);
router.delete('/:id/likes', cardIdValidation, dislikeCard);
module.exports = router;
