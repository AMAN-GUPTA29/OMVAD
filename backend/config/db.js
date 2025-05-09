const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database
 * @returns {Promise<void>}
 * @throws {Error} If connection fails
 * @description Connects to the MongoDB database
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 