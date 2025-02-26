const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {
    app.get('/download/igdl', async (req, res) => {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: 'URL is required' });
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                }
            });

            const $ = cheerio.load(response.data);
            const videoUrl = $('meta[property="og:video"]').attr('content');
            const imageUrl = $('meta[property="og:image"]').attr('content');

            if (!videoUrl && !imageUrl) {
                throw new Error('Media tidak ditemukan');
            }

            res.json({
                status: true,
                type: videoUrl ? 'video' : 'image',
                mediaUrl: videoUrl || imageUrl
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
