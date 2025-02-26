const express = require("express");
const fetch = require("node-fetch");

module.exports = function(app) {
    app.get("/ai/gpt-kenz", async (req, res) => {
        let { text } = req.query;
        if (!text) return res.status(400).json({ status: false, error: "Text is required" });

        try {
            let apiUrl = `https://restapi-v2.simplebot.my.id/ai/openai?text=${encodeURIComponent(text)}`;
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
