const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/download/gdrive", async (req, res) => {
        let { url } = req.query;
        if (!url) {
            return res.status(400).json({ status: false, error: "URL is required" });
        }

        try {
            let apiUrl = `https://restapi-v2.simplebot.my.id/download/gdrive?url=${encodeURIComponent(url)}`;
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