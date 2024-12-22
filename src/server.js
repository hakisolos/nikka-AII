const express = require('express');
const cors = require('cors');
const path = require('path');
const { YanzGPT } = require('./yanzgpt');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

// API Route for YanzGPT
app.post('/api', async (req, res) => {
  const { query, prompt } = req.body;

  if (!query || !prompt) {
    return res.status(400).json({ error: "Both 'query' and 'prompt' are required!" });
  }

  try {
    const response = await YanzGPT(query, prompt);
    res.json({ response });
  } catch (error) {
    console.error('Error interacting with NIKKA:', error.message);
    res.status(500).json({ error: "Failed to interact with YanzGPT API." });
  }
});

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
