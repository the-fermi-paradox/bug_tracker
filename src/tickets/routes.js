const express = require('express');
const controller = require('./controller');
const checkId = require('../middleware/check_id');
const validate = require('../middleware/validate');
const schema = require('./schema');

const validatePut = validate(schema.update);
const validatePost = validate(schema.create);
const router = express.Router();

// GET a list of all tickets
router.get('/', controller.list);

router.get('/sum', controller.sum);

router.get('/by-product/:id', checkId, controller.byProduct);

// GET a specific ticket
router.get('/:id', checkId, controller.get);

// CREATE a new ticket
router.post('/', validatePost, controller.create);

// DELETE a ticket
router.delete('/:id', checkId, controller.remove);

// UPDATE a ticket
router.put('/:id', checkId, validatePut, controller.update);

module.exports = router;
