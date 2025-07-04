const express = require('express');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/boards', require('./routes/board.route'));
app.use('/api', require('./routes/task.route')); // ✅ updated here

// Optional: health check
app.get('/', (req, res) => {
  res.send('Trello Clone Backend API is running!');
});

module.exports = app;
