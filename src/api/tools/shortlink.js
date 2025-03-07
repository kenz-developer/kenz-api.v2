const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/tools/shortlink", async (req, res) => {
        let { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: "URL diperlukan!" });
        }

        try {
            let response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            let shortUrl = await response.text();

            if (!shortUrl.startsWith("https://")) throw new Error("Gagal memperpendek URL!");

            res.json({
                status: true,
                result: shortUrl
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
