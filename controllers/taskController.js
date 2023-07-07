const mongoose = require('mongoose');
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const newTask = new Task(req.body)
  const savedTask = await newTask.save()
  res.json(savedTask)
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid task id' });
    return;
  }
  const task = await Task.findById(id);
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted successfully" });
};

