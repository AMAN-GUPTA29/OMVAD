const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema for a user
 * @typedef {Object} User
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 * @property {Date} createdAt - The date and time the user was created
 * @property {Date} updatedAt - The date and time the user was last updated
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

/**
 * Hashes the password before saving the user
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>}
 * @description Hashes the password before saving the user
 */
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compares the entered password with the user's password
 * @param {string} enteredPassword - The password entered by the user
 * @returns {Promise<boolean>} True if the passwords match, false otherwise
 * @description Compares the entered password with the user's password
 */
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User; 