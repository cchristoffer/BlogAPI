const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
  },
  url: {
    type: String,
    required: [true, 'A project must have a github link'],
  },
  description: {
    type: String,
    required: [true, 'A project must have a description'],
  },
  img: {
    type: String,
    required: [true, 'A project must have a cover image'],
  },
  tags: {
    type: [String],
    required: [true, 'A project must have at least one tag'],
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
