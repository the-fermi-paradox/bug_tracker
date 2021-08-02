const express = require('express');
const controller = require('./controller');

const router = express.Router();

// GET a list of all tickets
router.get('/', controller.list);

// GET a specific ticket
router.get('/:id', controller.get);

// CREATE a new ticket
router.post('/', controller.create);

// DELETE a ticket
router.delete('/:id', controller.remove);

// UPDATE a ticket
router.put('/:id', controller.update);

module.exports = router;
