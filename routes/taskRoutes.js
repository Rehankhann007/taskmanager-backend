const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  smartAssignTask
} = require('../controllers/taskController');

// Existing routes
router.post('/', createTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);  // <== This must exist
router.post('/:id/smart-assign', smartAssignTask);

module.exports = router;
