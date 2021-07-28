const express = require('express');
const bugControl = require('./bugController');

const router = express.Router();

// GET a list of all bugs
router.get('/bugs', () => {
  bugControl.list();
});

// GET a specific bug
router.get('/bugs/:id', (req) => {
  const { id } = req.params;
  bugControl.detail(id);
});

// CREATE a new bug
router.post('/bugs/:id', (req) => {
  const { id } = req.params;
  bugControl.create(id);
});

// DELETE a bug
router.delete('/bugs/:id', (req) => {
  const { id } = req.params;
  bugControl.delete(id);
});

// UPDATE a bug
router.put('/bugs/:id', (req) => {
  const { id } = req.params;
  bugControl.update(id);
});

module.exports = router;
