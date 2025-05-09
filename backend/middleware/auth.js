const jwt = require('jsonwebtoken');
const User = require('../models/User');

 /**
  * Protects routes by verifying the JWT token
  * @param {Object} req - The request object
  * @param {Object} res - The response object
  * @param {Function} next - The next middleware function
  * @returns {Promise<void>}
  * @description Protects routes by verifying the JWT token
  */
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect }; 