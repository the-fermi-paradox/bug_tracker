const express = require('express');
const bugControl = require('./bugController');

const router = express.Router();

// TODO: implement extraction functions
// to ensure a separation of our web layer
// from our controller

// GET a list of all bugs
router.get('/bugs', (req, res) => {
  const parse = [...req];
  bugControl.list(parse);
});
// GET a specific bug
router.get('/bugs/:id', (req, res) => {
  const parse = [...req];
  bugControl.detail(parse);
});
// CREATE a new bug
router.post('/bugs/:id', (req, res) => {
  const parse = [...req];
  bugControl.create(parse);
});
// DELETE a bug
router.delete('/bugs/:id', (req, res) => {
  const parse = [...req];
  bugControl.remove(parse);
});
// UPDATE a bug
router.put('/bugs/:id', (req, res) => {
  const parse = [...req];
  bugControl.update(parse);
});

module.exports = router;
