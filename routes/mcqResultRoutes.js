// routes/mcqResultRoutes.js
const express = require('express');
const router = express.Router();
const McqResult = require('../models/mcqResultModel');

// GET all results
router.get('/mcqResults', async (req, res) => {
  try {
    const results = await McqResult.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new result
router.post('/mcqResults', async (req, res) => {
  try {
    const result = new McqResult(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH a result by ID
router.patch('/mcqResults/:id', async (req, res) => {
  try {
    const result = await McqResult.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a result by ID
router.delete('/mcqResults/:id', async (req, res) => {
  try {
    await McqResult.findByIdAndDelete(req.params.id);
    res.json({ message: 'Result deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
