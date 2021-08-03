const express = require('express');
const controller = require('./controller');
const checkId = require('../middleware/check_id');

const router = express.Router();

// GET a list of all users
router.get('/', controller.list);

// GET a specific user
router.get('/:id', checkId, controller.get);

// CREATE a new user
router.post('/', controller.create);

// DELETE a user
router.delete('/:id', checkId, controller.remove);

// UPDATE a user
router.put('/:id', checkId, controller.update);

module.exports = router;
