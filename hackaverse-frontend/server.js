import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.MOCK_API_PORT || 3002;

// Middleware
app.use(express.json());

// Mock API endpoints
app.get('/api/user/profile', (req, res) => {
  res.json({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Team Lead'
  });
});

app.get('/api/dashboard/teams', (req, res) => {
  res.json([
    { id: 1, name: 'Quantum Coders', category: 'AI/ML', members: 4, status: 'active' },
    { id: 2, name: 'Blockchain Pioneers', category: 'Web3', members: 3, status: 'pending' }
  ]);
});

app.get('/api/dashboard/projects', (req, res) => {
  res.json([
    { id: 1, name: 'AI Chatbot', category: 'AI/ML', submissionLink: 'https://example.com', team: 'Quantum Coders', status: 'submitted', lastUpdated: '2025-10-15' },
    { id: 2, name: 'Blockchain Game', category: 'Web3', submissionLink: 'https://example.com', team: 'Blockchain Pioneers', status: 'in-progress', lastUpdated: '2025-10-16' },
    { id: 3, name: 'VR Experience', category: 'Gaming', submissionLink: 'https://example.com', team: 'Team Gamma', status: 'draft', lastUpdated: '2025-10-17' }
  ]);
});

app.get('/api/dashboard/scores', (req, res) => {
  res.json([
    { team: 'Quantum Coders', score: 85, rank: 2, trend: 'up' },
    { team: 'Blockchain Pioneers', score: 92, rank: 1, trend: 'up' },
    { team: 'Team Gamma', score: 78, rank: 3, trend: 'down' }
  ]);
});

app.get('/api/dashboard/messages', (req, res) => {
  res.json([
    { id: 1, text: 'Welcome to HackaVerse! How can I help you today?', sender: 'AI Mentor', timestamp: new Date().toISOString() }
  ]);
});

app.post('/api/agent/chat', (req, res) => {
  res.json({
    reply: 'Thanks for your message! This is a mock response from the AI mentor. In a real implementation, this would connect to an AI service.'
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});