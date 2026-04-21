const Person = require('../models/Person');

// Get all people for logged in user
const getPeople = async (req, res) => {
  try {
    const people = await Person.find({ user: req.user._id }).sort({ name: 1 });
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create person
const createPerson = async (req, res) => {
  try {
    const person = await Person.create({ ...req.body, user: req.user._id });
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update person
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete person
const deletePerson = async (req, res) => {
  try {
    const person = await Person.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPeople, createPerson, updatePerson, deletePerson };