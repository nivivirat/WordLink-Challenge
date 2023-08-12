// server/index.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const { readQuestions, saveScore } = require('./mongoDBHelper'); // Import MongoDB helper functions

const app = express();
const port = 3000; // Change to your desired port

// Enable CORS for the Vite React app
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the Vite React app
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json()); // Use JSON middleware to parse incoming JSON data

// Serve the static React build files
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Endpoint to fetch questions from MongoDB and send them to the front-end
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await readQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to save user score and username to MongoDB
app.post('/api/saveScore', async (req, res) => {
  try {
    const { username, score } = req.body;
    await saveScore(username, score);
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all route to serve the React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
