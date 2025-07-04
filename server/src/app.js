const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',  // React frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/auth.route'));     // updated prefix
app.use('/api/boards', require('./routes/board.route'));  // ✅ FIXED HERE
app.use('/api/tasks', require('./routes/task.route'));    // ✅ moved to /api/tasks

// ✅ Optional: health check route
app.get('/', (req, res) => {
  res.send('Trello Clone Backend API is running!');
});

module.exports = app;
