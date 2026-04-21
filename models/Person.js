const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  emoji: {
    type: String,
    default: '🎬'
  }
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);