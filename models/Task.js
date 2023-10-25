const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  isImportant: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', TaskSchema)

