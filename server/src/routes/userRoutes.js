const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');

// Route to get the user
router.get('/', getUser);

// Route to update the user
router.put('/', updateUser);

module.exports = router;
