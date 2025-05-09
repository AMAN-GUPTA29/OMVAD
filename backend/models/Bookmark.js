const mongoose = require('mongoose');

/**
 * Schema for a bookmark
 * @typedef {Object} Bookmark
 * @property {mongoose.Schema.Types.ObjectId} user - The user who owns the bookmark
 * @property {string} url - The URL of the bookmark
 * @property {string} title - The title of the bookmark
 * @property {string} favicon - The favicon of the bookmark
 * @property {string} summary - The summary of the bookmark
 * @property {string[]} tags - The tags of the bookmark
 * @property {number} order - The order of the bookmark
 * @property {Date} createdAt - The date and time the bookmark was created
 * @property {Date} updatedAt - The date and time the bookmark was last updated
*/
const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    favicon: {
        type: String
    },
    summary: {
        type: String
    },
    tags: [{
        type: String
    }],
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark; 