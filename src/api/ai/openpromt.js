const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/ai/openprompt", async (req, res) => {
        let { prompt, q } = req.query;
        if (!prompt || !q) {
            return res.status(400).json({ status: false, error: "Prompt and query are required" });
        }

        try {
            let apiUrl = `https://restapi.simplebot.my.id/api/ai/openai-prompt?prompt=${encodeURIComponent(prompt)}&q=${encodeURIComponent(q)}`;
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