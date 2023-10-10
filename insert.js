const axios = require('axios');
const fs = require('fs');
const path = require('path');

const inputFolder = './input'; // Replace with the path to your input folder
const apiUrl = 'http://localhost:3000'; // Use your local API URL

async function insertQuestionsFromFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(fileContents);

    for (const question of questions) {
      const response = await axios.post(`${apiUrl}/api/mcqQuestions`, question);
      console.log(`Question inserted from file ${filePath}: ${response.data._id}`);
    }
  } catch (error) {
    console.error(`Error inserting questions from file ${filePath}: ${error.message}`);
  }
}

// Read all JSON files in the input folder
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading input folder:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(inputFolder, file);

    // Check if the file is a JSON file
    if (path.extname(filePath) === '.json') {
      insertQuestionsFromFile(filePath);
    }
  });
});
