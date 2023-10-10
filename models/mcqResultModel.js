// mcqResultModel.js
const mongoose = require('mongoose');

const mcqResultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const McqResult = mongoose.model('McqResult', mcqResultSchema);

module.exports = McqResult;
