const express = require('express');
const bugControl = require('./bugController');

const router = express.Router();

// GET a list of all bugs
router.get('/bugs', bugControl.list);
// GET a specific bug
router.get('/bugs/:id', bugControl.detail);
// CREATE a new bug
router.post('/bugs/:id', bugControl.create);
// DELETE a bug
router.delete('/bugs/:id', bugControl.remove);
// UPDATE a bug
router.put('/bugs/:id', bugControl.update);

module.exports = router;
