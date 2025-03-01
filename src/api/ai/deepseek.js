const express = require("express");
const fetch = require("node-fetch");

const API_KEY = "sk-735c6dc778734807aa031f9dca057067";

module.exports = function (app) {
    app.get("/ai/deepseek", async (req, res) => {
        let { prompt } = req.query;
        if (!prompt) {
            return res.status(400).json({ status: false, error: "Prompt is required" });
        }

        try {
            let response = await fetch("https://api.deepseek.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [{ role: "user", content: prompt }]
                })
            });

            let data = await response.json();
            if (!data.choices) throw new Error("Failed to get response from DeepSeek");

            res.json({
                status: true,
                result: data.choices[0].message.content
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
