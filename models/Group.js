const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
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
  description: {
    type: String
  },
  posterPath: {
    type: String
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);