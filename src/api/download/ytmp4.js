const fetch = require('node-fetch');

module.exports = function(app) {
    app.get('/download/ytmp4', async (req, res) => {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: 'URL is required' });
        }

        try {
            const apiUrl = `https://api.vevioz.com/api/button/mp4?url=${encodeURIComponent(url)}`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Gagal mengambil data');

            res.json({
                status: true,
                downloadUrl: apiUrl
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};