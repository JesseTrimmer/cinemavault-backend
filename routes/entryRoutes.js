const express = require('express');
const router = express.Router();
const {
  getEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
  getStats
} = require('../controllers/entryController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.get('/stats', getStats);
router.get('/', getEntries);
router.get('/:id', getEntry);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

module.exports = router;