const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  createdAt: Date,
  author: String,
  author_name: String,
  title: String,
  url: String,
  votes: {
    type: Schema.Types.Mixed,
    default: {}
  },
  rating: {
    type: Number,
    default: 0
  }
});

const ModelClass = mongoose.model('article', articleSchema);

module.exports = ModelClass;
