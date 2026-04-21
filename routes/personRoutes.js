const express = require('express');
const router = express.Router();
const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson
} = require('../controllers/personController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getPeople);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;