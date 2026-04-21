const Group = require('../models/Group');
const Entry = require('../models/Entry');

// Get all groups for logged in user
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user._id })
      .populate('entries', 'title posterPath releaseYear rating status')
      .sort({ name: 1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single group
const getGroup = async (req, res) => {
  try {
    const group = await Group.findOne({ _id: req.params.id, user: req.user._id })
      .populate('entries', 'title posterPath releaseYear rating status');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create group
const createGroup = async (req, res) => {
  try {
    const group = await Group.create({ ...req.body, user: req.user._id });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update group
const updateGroup = async (req, res) => {
  try {
    const group = await Group.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete group
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    // Remove group reference from all entries
    await Entry.updateMany({ group: req.params.id }, { $unset: { group: 1 } });
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGroups, getGroup, createGroup, updateGroup, deleteGroup };