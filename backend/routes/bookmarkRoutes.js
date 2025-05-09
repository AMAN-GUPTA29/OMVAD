const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createBookmark,
    getBookmarks,
    deleteBookmark,
    updateBookmarkOrder
} = require('../controllers/bookmarkController');
/**
 * @route POST /api/bookmarks
 * @desc Create a new bookmark
 * @access Private
 */

/**
 * @route GET /api/bookmarks
 * @desc Get all bookmarks
 * @access Private
 */

router.route('/')
    .post(protect, createBookmark)
    .get(protect, getBookmarks);

/**
 * @route DELETE /api/bookmarks/:id
 * @desc Delete a bookmark by ID
 * @access Private
 */

router.route('/:id')
    .delete(protect, deleteBookmark);

/**
 * @route PUT /api/bookmarks/reorder
 * @desc Reorder bookmarks
 * @access Private
 */

router.route('/reorder')
    .put(protect, updateBookmarkOrder);

module.exports = router; 