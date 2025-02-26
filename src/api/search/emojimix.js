const express = require("express");
const fetch = require("node-fetch");

module.exports = function(app) {
    app.get("/search/emojimix", async (req, res) => {
        let { emoji1, emoji2 } = req.query;
        if (!emoji1 || !emoji2) {
            return res.status(400).json({ status: false, error: "Both emoji1 and emoji2 are required" });
        }

        try {
            let apiUrl = `https://restapi-v2.simplebot.my.id/tools/emojimix?emoji1=${encodeURIComponent(emoji1)}&emoji2=${encodeURIComponent(emoji2)}`;
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
