const express = require('express');
const bugControl = require('./ticketController');

const router = express.Router();

// GET a list of all bugs
router.get('/bugs', () => {
  bugControl.list();
});

// GET a specific bug
router.get('/bugs/:id', (req) => {
  const { id } = req.params;
  bugControl.detail(id);
});

// CREATE a new bug
router.post('/bugs/:priority/:severity/:type/:reporterId/:productId', (req) => {
  const data = {
    title: req.params.title,
    priority: req.params.priority,
    severity: req.params.severity,
    type: req.params.type,
    reporterId: req.params.reporterId,
    productId: req.params.productId,
  };
  bugControl.create(data);
});

// DELETE a bug
router.delete('/bugs/:id', (req) => {
  const { id } = req.params;
  bugControl.delete(id);
});

// UPDATE a bug
router.put('/bugs/:id', (req) => {
  const data = {
    id: req.params.id,
    priority: req.query.priority,
    severity: req.query.severity,
    type: req.query.type,
    reporterId: req.query.reporterId,
    productId: req.query.productId,
  };

  bugControl.update(data);
});

module.exports = router;
