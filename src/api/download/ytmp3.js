const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/api/ytmp3", async (req, res) => {
        let { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: "URL is required" });
        }

        try {
            let y2mateUrl = "https://www.y2mate.com/youtube-mp3";
            let response = await fetch(y2mateUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `url=${encodeURIComponent(url)}`
            });

            let html = await response.text();
            let $ = cheerio.load(html);

            let title = $("h2").text().trim();
            let duration = $(".info-duration").text().trim();
            let thumbnail = $(".img-responsive").attr("src");
            let audioUrl = $("a.btn-download").attr("href");

            if (!audioUrl) throw new Error("Gagal mendapatkan link download");

            res.json({
                status: true,
                result: {
                    title,
                    duration,
                    thumbnail,
                    audio_url: audioUrl
                }
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
