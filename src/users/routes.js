const express = require('express');
const controller = require('./controller');
const checkId = require('../middleware/check_id');
const validate = require('../middleware/validate');
const schema = require('./schema');

const router = express.Router();

// GET a list of all users
router.get('/', controller.list);

// GET a specific user
router.get('/:id', checkId, controller.get);

// CREATE a new user
router.post('/', validate(schema.create), controller.create);

// DELETE a user
router.delete('/:id', checkId, controller.remove);

// UPDATE a user
router.put('/:id', checkId, validate(schema.update), controller.update);

module.exports = router;
