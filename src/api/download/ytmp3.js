const express = require("express");
const fetch = require("node-fetch");

const apiKeys = {
    "kenzapikey": { limit: 5 }
};

const usageTracker = new Map(); // Simpan penggunaan API key sementara

function checkApiKey(req, res, next) {
    let key = req.query.apikey;
    if (!key || !apiKeys[key]) {
        return res.status(403).json({ status: false, error: "Invalid or missing API key" });
    }

    if (!usageTracker.has(key)) {
        usageTracker.set(key, 0); // Inisialisasi jika belum ada
    }

    if (usageTracker.get(key) >= apiKeys[key].limit) {
        return res.status(429).json({ status: false, error: "API key limit exceeded" });
    }

    usageTracker.set(key, usageTracker.get(key) + 1); // Tambah penggunaan
    next();
}

module.exports = function (app) {
    app.get("/download/ytmp3", checkApiKey, async (req, res) => {
        let { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: "URL is required" });
        }

        try {
            let apiUrl = `https://restapi-v2.simplebot.my.id/download/ytmp3?url=${encodeURIComponent(url)}}}`;
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
