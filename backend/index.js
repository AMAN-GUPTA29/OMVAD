/**
 * @description Main entry point for the application
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

dotenv.config();

/**
 * Connects to the MongoDB database
 */
connectDB();

const app = express();

/**
 * Rate limiting configuration
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
app.use(limiter);




/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */

app.use('/api/users', userRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 