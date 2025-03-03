const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/ai/mistral", async (req, res) => {
        let { text } = req.query;
        if (!text) {
            return res.status(400).json({ status: false, error: "Teks diperlukan!" });
        }

        try {
            let response = await fetch(`https://jazxcode.biz.id/ai/mistral?text=${encodeURIComponent(text)}`);
            let result = await response.json();

            if (!result || !result.status) throw new Error("Gagal mendapatkan data!");

            res.json({
                status: true,
                result: result.result
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
