const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Admin',
  },
  role: {
    type: String,
    default: 'admin',
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
