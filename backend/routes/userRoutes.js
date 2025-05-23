const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');



/**
 * @route POST /api/users
 * @desc Register a new user
 * @access Public
 */
router.post('/', registerUser);

/**
 * @route POST /api/users/login
 * @desc Login a user
 * @access Public
 */
router.post('/login', loginUser);

module.exports = router; 