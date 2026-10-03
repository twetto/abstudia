const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const Task = require('../models/Task')

router.use(authController.ensureAuthenticated);
// Express 4 doesn't catch rejected promises; pass them to the error handler
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', wrap(taskController.getTasks));
router.post('/', wrap(taskController.createTask));
router.delete('/:id', wrap(taskController.deleteTask));

module.exports = router;

