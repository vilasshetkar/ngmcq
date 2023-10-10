const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mcqQuestionRoutes = require('./routes/mcqQuestionRoutes');
const mcqResultRoutes = require('./routes/mcqResultRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', mcqQuestionRoutes);
app.use('/api', mcqResultRoutes);

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://ngmcq:8lB3Qm5j6DYpWn3z@cluster1.2lk9mic.mongodb.net/ngmcq?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
