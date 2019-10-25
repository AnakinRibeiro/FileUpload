const mongoose = require('mongoose');

const ManualSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true,
    unique: true
  },
  path: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Manual = mongoose.model('manual', ManualSchema);
