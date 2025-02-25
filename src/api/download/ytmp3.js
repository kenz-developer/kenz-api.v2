const ytdl = require('ytdl-core');

module.exports = function(app) {
    app.get('/download/ytmp3', async (req, res) => {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: 'URL is required' });
        }

        try {
            if (!ytdl.validateURL(url)) {
                return res.status(400).json({ status: false, error: 'Invalid YouTube URL' });
            }

            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

            res.json({
                status: true,
                title: info.videoDetails.title,
                thumbnail: info.videoDetails.thumbnails.pop().url,
                audioUrl: format.url
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
