const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 300,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('sentence', sentenceSchema);
