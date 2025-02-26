const express = require("express");
const fetch = require("node-fetch");

module.exports = function(app) {
    app.get("/search/whois", async (req, res) => {
        let { domain } = req.query;
        if (!domain) return res.status(400).json({ status: false, error: "Domain is required" });

        try {
            let apiUrl = `https://restapi.simplebot.my.id/api/tools/whois?domain=${encodeURIComponent(domain)}`;
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
