const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/download/ytdlv3", async (req, res) => {
        let { url, type = "mp4", quality = "720p" } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: "URL is required" });
        }
        if (!["mp3", "mp4"].includes(type)) {
            return res.status(400).json({ status: false, error: "Type must be 'mp3' or 'mp4'" });
        }

        try {
            let apiUrl = `https://jazxcode.biz.id/downloader/ytdl?url=${encodeURIComponent(url)}&type=${type}&quality=${quality}`;
            let response = await fetch(apiUrl);
            let data = await response.json();

            if (!data.status) throw new Error(data.error || "Gagal mengambil data");

            res.json({
                status: true,
                result: {
                    title: data.result.title,
                    duration: data.result.duration,
                    thumbnail: data.result.thumbnail,
                    download_url: data.result.url,
                    type: type,
                    quality: quality
                }
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
