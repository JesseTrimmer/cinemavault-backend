const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Basic info (auto-filled from TMDB)
  tmdbId: { type: Number, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['movie', 'show'], required: true },
  posterPath: { type: String },
  backdropPath: { type: String },
  genres: [{ type: String }],
  releaseYear: { type: Number },
  runtime: { type: Number }, // in minutes

  // User's personal data
  status: {
    type: String,
    enum: ['watched', 'watching', 'stopped', 'watchlist'],
    required: true
  },
  stopReason: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  notes: { type: String },
  favoriteCharacter: { type: String },
  dateStarted: { type: Date },
  dateFinished: { type: Date },

  // Watched with
  watchedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }],

  // Rewatch tracking
  rewatchCount: { type: Number, default: 0 },
  rewatchDates: [{ type: Date }],

seasonRatings: [{
    season: { type: Number },
    rating: { type: Number, min: 1, max: 5 }
  }],

  // Series/group
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }

}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);