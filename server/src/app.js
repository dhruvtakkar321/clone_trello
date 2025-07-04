const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',  // or replace with your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes (no extra '/api' prefixes added here)
app.use('/auth', require('./routes/auth.route'));
app.use('/boards', require('./routes/board.route'));
app.use('/', require('./routes/task.route')); // task routes start with /boards/:id/task

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Trello Clone Backend API is running!');
});

module.exports = app;
