const express = require("express");
const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/stalking/epep", async (req, res) => {
        let { id } = req.query;
        if (!id) {
            return res.status(400).json({ status: false, error: "ID Free Fire diperlukan!" });
        }

        try {
            let response = await fetch(`https://velyn-ererexidchx-api.vercel.app/api/stalk/FreeFireStalk?id=${id}`);
            let result = await response.json();

            if (!result || !result.status) throw new Error("Gagal mendapatkan data!");

            res.json({
                status: true,
                data: result.result
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
