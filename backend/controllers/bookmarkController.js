const Bookmark = require('../models/Bookmark');
const { getUrlMetadata } = require('../utils/urlMetadata');
const { getSummary } = require('../utils/summaryApi');
const { generateTags } = require('../utils/tagGenerator');

/**
 * Creates a new bookmark for the authenticated user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 * @description Creates a new bookmark with metadata, summary, and tags
 */
const createBookmark = async (req, res) => {
    try {
        const { url } = req.body;

        // Check if bookmark already exists for this user
        const existingBookmark = await Bookmark.findOne({
            user: req.user._id,
            url: url
        });

        if (existingBookmark) {
            return res.status(400).json({ message: 'This URL is already bookmarked' });
        }

        // Fetch metadata from URL
        const { title, favicon } = await getUrlMetadata(url);
        
        // Get summary from Jina AI
        const summary = await getSummary(url);

        // Generate tags automatically
        const tags = generateTags(url, title, summary);

        const bookmark = await Bookmark.create({
            user: req.user._id,
            url,
            title,
            favicon,
            summary,
            tags,
            order: await Bookmark.countDocuments({ user: req.user._id })
        });

        res.status(201).json(bookmark);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Gets all bookmarks for the authenticated user with pagination
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 * @description Retrieves paginated bookmarks for the current user
 */
const getBookmarks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalBookmarks = await Bookmark.countDocuments({ user: req.user._id });
        const totalPages = Math.ceil(totalBookmarks / limit);

        const bookmarks = await Bookmark.find({ user: req.user._id })
            .sort({ order: 1 })
            .skip(skip)
            .limit(limit);

        res.json({
            bookmarks,
            currentPage: page,
            totalPages,
            totalBookmarks
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Deletes a bookmark by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 * @description Removes a bookmark and reorders remaining bookmarks
 */
const deleteBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        await bookmark.deleteOne();

        // Reorder remaining bookmarks
        const remainingBookmarks = await Bookmark.find({ user: req.user._id })
            .sort({ order: 1 });

        for (let i = 0; i < remainingBookmarks.length; i++) {
            remainingBookmarks[i].order = i;
            await remainingBookmarks[i].save();
        }

        res.json({ message: 'Bookmark deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Updates the order of bookmarks
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 * @description Reorders bookmarks based on the provided array
 */
const updateBookmarkOrder = async (req, res) => {
    try {
        const { bookmarks } = req.body;

        for (let i = 0; i < bookmarks.length; i++) {
            await Bookmark.findOneAndUpdate(
                { _id: bookmarks[i]._id, user: req.user._id },
                { order: i }
            );
        }

        res.json({ message: 'Bookmark order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBookmark,
    getBookmarks,
    deleteBookmark,
    updateBookmarkOrder
}; 