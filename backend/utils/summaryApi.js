
/**
 * Fetches a summary of a given URL using the Jina AI API
 * @param {string} url - The URL to fetch a summary for
 * @returns {Promise<string>} A promise that resolves to the summary of the URL
 * @description Fetches a summary of a given URL using the Jina AI API
 */
const getSummary = async (url) => {
    try {
        const target = encodeURIComponent(url);
        const response = await fetch(`https://r.jina.ai/${target}`);
        console.log("s")
        if (!response.ok) {
            throw new Error('Failed to fetch summary');
        }

        const summary = await response.text();
        
        // Split into lines and filter out title and image-related content
        const filteredLines = summary
            .split('\n')
            .map(line => line.trim())
            .filter(line => {
                // Skip empty lines
                if (!line) return false;
                // Skip lines that are likely titles (short lines with all caps or ending with colon)
                if (line.length < 50 && (line.toUpperCase() === line || line.endsWith(':'))) return false;
                // Skip lines that contain image-related text
                if (line.toLowerCase().includes('image') || 
                    line.toLowerCase().includes('photo') || 
                    line.toLowerCase().includes('picture')) return false;
                return true;
            })
            .join(' ');

        // Split the filtered content into sentences and take the first 5
        const sentences = filteredLines
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .slice(0, 5)
            .join('. ') + '.';

        return sentences;
    } catch (error) {
        console.error('Summary API Error:', error);
        return 'Summary temporarily unavailable.';
    }
};

module.exports = { getSummary }; 