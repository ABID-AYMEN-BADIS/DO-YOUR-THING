const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);
router.put('/:id/complete', taskController.markComplete);
router.get('/', taskController.index);
router.post('/', taskController.store);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.destroy);
router.get('/:id', taskController.show);
router.get('/test', (req, res) => {
  res.send('Route test OK');
});




module.exports = router;
