// routes/mcqQuestionRoutes.js
const express = require('express');
const router = express.Router();
const McqQuestion = require('../models/mcqQuestionModel');

// GET all questions or filter by topic
router.get('/mcqQuestions', async (req, res) => {
  try {
    const { topic } = req.query;
    const query = topic ? { topic } : {};
    const questions = await McqQuestion.aggregate([{ $match: query }, { $sample: { size: 10 } }]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new question
router.post('/mcqQuestions', async (req, res) => {
  try {
    const question = new McqQuestion(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH a question by ID
router.patch('/mcqQuestions/:id', async (req, res) => {
  try {
    const question = await McqQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a question by ID
router.delete('/mcqQuestions/:id', async (req, res) => {
  try {
    await McqQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
