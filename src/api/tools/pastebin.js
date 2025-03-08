const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.post("/tools/pastebin", async (req, res) => {
        let { content } = req.body;
        if (!content) {
            return res.status(400).json({ status: false, error: "Content tidak boleh kosong!" });
        }

        try {
            let response = await fetch("https://pastebin.com/api/api_post.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    api_dev_key: "H-pHns198c_wKHPvELbZcYY7SFQvataL",
                    api_option: "paste",
                    api_paste_code: content,
                    api_paste_private: "0",
                    api_paste_expire_date: "1Y",
                    api_paste_format: "html5" // Sesuai request buat HTML
                })
            });

            let pasteUrl = await response.text();
            console.log(pasteUrl); // Debugging

            if (!pasteUrl.startsWith("http")) throw new Error("Gagal membuat paste!");

            res.json({ status: true, result: { url: pasteUrl } });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
