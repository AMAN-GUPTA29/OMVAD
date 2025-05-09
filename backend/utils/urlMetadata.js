const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

/**
 * Ensures the URL has a valid protocol (http:// or https://)
 * @param {string} url - The URL to validate
 * @returns {string} The URL with a valid protocol
 */
const ensureValidUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
};

/**
 * Fetches and extracts metadata from a URL including title and favicon
 * @param {string} url - The URL to fetch metadata from
 * @returns {Promise<{title: string, favicon: string}>} Object containing title and favicon URL
 */
const getUrlMetadata = async (url) => {
    try {
        const validUrl = ensureValidUrl(url);
        
        const response = await fetch(validUrl);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        let title = document.querySelector('title')?.textContent || '';
        
        if (!title) {
            const metaTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                            document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
            if (metaTitle) {
                title = metaTitle;
            }
        }

        if (title) {
            title = title
                .replace(/\s+/g, ' ')
                .replace(/[-|–—]/, '')
                .trim();
        }

        let favicon = '';
        const faviconLink = document.querySelector('link[rel="icon"]') || 
                          document.querySelector('link[rel="shortcut icon"]');
        
        if (faviconLink) {
            try {
                favicon = new URL(faviconLink.getAttribute('href'), validUrl).href;
            } catch (error) {
                console.error('Error parsing favicon URL:', error);
            }
        }

        if (!favicon) {
            const domain = new URL(validUrl).hostname;
            favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        }

        return {
            title: title || url,
            favicon
        };
    } catch (error) {
        console.error('Error fetching URL metadata:', error);
        return {
            title: url,
            favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`
        };
    }
};

module.exports = { getUrlMetadata, ensureValidUrl }; 