const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController');
const Task = require('../models/Task')

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router

