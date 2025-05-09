const { ensureValidUrl } = require('./urlMetadata');

/**
 * Generates tags for a bookmark based on URL, title, and summary
 * @param {string} url - The bookmark URL
 * @param {string} title - The bookmark title
 * @param {string} summary - The bookmark summary
 * @returns {string[]} Array of generated tags
 */
const generateTags = (url, title, summary) => {
    const tags = new Set();

    /** Extract domain as a tag */
    try {
        const validUrl = ensureValidUrl(url);
        const domain = new URL(validUrl).hostname
            .replace('www.', '')
            .split('.')
            .slice(0, -1)
            .join('.');
        if (domain) tags.add(domain);
    } catch (error) {
        console.error('Error parsing URL for tags:', error);
    }

    /** Extract words from title */
    if (title) {
        const titleWords = title
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3); /** Only words longer than 3 characters */
        
        /** Add top 3 most significant words from title */
        titleWords.slice(0, 3).forEach(word => tags.add(word));
    }

    /** Extract words from summary */
    if (summary) {
        const summaryWords = summary
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3); /** Only words longer than 3 characters */
        
        /** Add top 2 most significant words from summary */
        summaryWords.slice(0, 2).forEach(word => tags.add(word));
    }

    return Array.from(tags);
};

module.exports = { generateTags }; 