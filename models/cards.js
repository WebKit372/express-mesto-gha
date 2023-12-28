const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          // eslint-disable-next-line no-useless-escape
          return /^http(s)?:\/\/(www\.)?[\w\d\-._~:\/?#[\]@!$&'()*+,;=]+#?$/.test(v);
        },
        message: 'Некорректный формат URL',
      },
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'user ',
    },
    likes: [{
      type: ObjectId,
      ref: 'user ',
      default: null,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('card', cardSchema);
