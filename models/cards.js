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
    },
    owner: {
      type: ObjectId,
      required: true,
    },
    likes: [{
      type: ObjectId,
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
