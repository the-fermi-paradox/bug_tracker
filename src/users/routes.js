const express = require('express');
const controller = require('./controller');

const router = express.Router();

// GET a list of all users
router.get('/', controller.list);

// GET a specific user
router.get('/:id', controller.get);

// CREATE a new user
router.post('/', controller.create);

// DELETE a user
router.delete('/:id', controller.remove);

// UPDATE a user
router.put('/:id', controller.update);

module.exports = router;
