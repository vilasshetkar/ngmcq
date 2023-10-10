// mcqQuestionModel.js
const mongoose = require('mongoose');

const mcqQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: Number,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

const McqQuestion = mongoose.model('McqQuestion', mcqQuestionSchema);

module.exports = McqQuestion;
