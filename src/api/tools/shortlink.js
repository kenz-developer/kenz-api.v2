const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/tools/shortlink", async (req, res) => {
        let { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: "URL is required" });
        }

        try {
            let apiUrl = `https://jazxcode.biz.id/tools/tinyurl?url=${encodeURIComponent(url)}`;
            let response = await fetch(apiUrl);
            let shortUrl = await response.text();

            if (!shortUrl.startsWith("http")) throw new Error("Gagal memperpendek URL");

            res.json({
                status: true,
                result: {
                    originalUrl: url,
                    shortUrl: shortUrl
                }
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
