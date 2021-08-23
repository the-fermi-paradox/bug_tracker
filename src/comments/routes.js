const express = require('express');
const controller = require('./controller');
const checkId = require('../middleware/check_id');
const validate = require('../middleware/validate');
const schema = require('./schema');

const router = express.Router();
const validatePut = validate(schema.update);
const validatePost = validate(schema.create);

// GET a list of all users
router.get('/', controller.list);

// GET a specific user
router.get('/:id', checkId, controller.get);

// CREATE a new user
router.post('/', validatePost, controller.create);

// DELETE a user
router.delete('/:id', checkId, controller.remove);

// UPDATE a user
router.put('/:id', checkId, validatePut, controller.update);

module.exports = router;
