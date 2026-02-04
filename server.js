/* eslint-env node */
/* global require, __dirname */
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the starfield test page
app.get('/starfield-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'starfield-test.html'));
});

// Serve the simple starfield test page
app.get('/simple-starfield-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'simple-starfield-test.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});