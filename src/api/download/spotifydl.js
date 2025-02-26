const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = function(app) {
    app.get("/search/spotifydl", async (req, res) => {
        let { q } = req.query;
        if (!q) return res.status(400).json({ status: false, error: "Query is required" });

        try {
            let apiKeyData = fs.readFileSync("apikey.json", "utf-8");
            let apiKeys = JSON.parse(apiKeyData).apikeys;
            
            if (!apiKeys.length) throw new Error("No API Key found");

            let randomApiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

            let apiUrl = `https://restapi-v2.simplebot.my.id/download/playspotify?apikey=${randomApiKey}&q=${encodeURIComponent(q)}`;
            let response = await fetch(apiUrl);
            let data = await response.json();

            if (!data.status) throw new Error(data.error || "Gagal mengambil data");

            res.json({
                status: true,
                result: data.result
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
