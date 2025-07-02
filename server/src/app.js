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
app.use('/auth', require('./routes/auth.route'));

app.use('/board', require('./routes/board.route'));
app.use('/', require('./routes/task.route'));

app.get('/', (req, res) => {
  res.send('Trello Clone Backend API is running!');
});

module.exports = app;
