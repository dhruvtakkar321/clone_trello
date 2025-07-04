const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/auth', require('./routes/auth.route'));
app.use('/boards', require('./routes/board.route'));
app.use('/boards', require('./routes/task.route')); // ✅ mounted at /boards

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Trello Clone Backend API is running!');
});

module.exports = app;
