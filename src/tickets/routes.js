const express = require('express');
const controller = require('./controller');

const router = express.Router();

// GET a list of all tickets
router.get('/', () => {
  controller.list();
});

// GET a specific ticket
router.get('/:id', (req) => {
  const { id } = req.params;
  controller.detail(id);
});

// CREATE a new ticket
router.post('/:priority/:severity/:type/:reporterId/:productId', (req) => {
  const data = {
    title: req.params.title,
    priority: req.params.priority,
    severity: req.params.severity,
    type: req.params.type,
    reporterId: req.params.reporterId,
    productId: req.params.productId,
  };
  controller.create(data);
});

// DELETE a ticket
router.delete('/:id', (req) => {
  const { id } = req.params;
  controller.delete(id);
});

// UPDATE a ticket
router.put('/:id', (req) => {
  const data = {
    id: req.params.id,
    priority: req.query.priority,
    severity: req.query.severity,
    type: req.query.type,
    reporterId: req.query.reporterId,
    productId: req.query.productId,
  };

  controller.update(data);
});

module.exports = router;
