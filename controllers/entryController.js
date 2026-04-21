const Entry = require('../models/Entry');

// Get all entries for logged in user
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id })
      .populate('watchedWith', 'name emoji')
      .populate('group', 'name')
      .sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single entry
const getEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, user: req.user._id })
      .populate('watchedWith', 'name emoji')
      .populate('group', 'name');
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create entry
const createEntry = async (req, res) => {
  try {
    const entry = await Entry.create({ ...req.body, user: req.user._id });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update entry
const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete entry
const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stats
const getStats = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id });

    const totalMovies = entries.filter(e => e.type === 'movie' && e.status === 'watched').length;
    const totalShows = entries.filter(e => e.type === 'show' && e.status === 'watched').length;
    const totalWatching = entries.filter(e => e.status === 'watching').length;
    const totalStopped = entries.filter(e => e.status === 'stopped').length;
    const totalRewatches = entries.reduce((acc, e) => acc + (e.rewatchCount || 0), 0);

    // Genre breakdown
    const genreCounts = {};
    entries.forEach(e => {
      e.genres.forEach(g => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });

    // By year
    const byYear = {};
    entries.filter(e => e.status === 'watched' && e.dateFinished).forEach(e => {
      const year = new Date(e.dateFinished).getFullYear();
      byYear[year] = (byYear[year] || 0) + 1;
    });

    // Average rating
    const rated = entries.filter(e => e.rating);
    const avgRating = rated.length
      ? (rated.reduce((acc, e) => acc + e.rating, 0) / rated.length).toFixed(1)
      : null;

    res.json({
      totalMovies,
      totalShows,
      totalWatching,
      totalStopped,
      totalRewatches,
      avgRating,
      genreCounts,
      byYear
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEntries, getEntry, createEntry, updateEntry, deleteEntry, getStats };