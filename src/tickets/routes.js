const express = require('express');
const controller = require('./controller');
const checkId = require('../middleware/check_id');

const router = express.Router();

// GET a list of all tickets
router.get('/', controller.list);

// GET a specific ticket
router.get('/:id', checkId, controller.get);

// CREATE a new ticket
router.post('/', controller.create);

// DELETE a ticket
router.delete('/:id', checkId, controller.remove);

// UPDATE a ticket
router.put('/:id', checkId, controller.update);

module.exports = router;
