const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// נתיב שורש
app.get("/", (req, res) => {
    res.send("Welcome to the Tanakh API Proxy!");
});

// נתיב /chapter
app.get("/chapter", async (req, res) => {
    const chapterName = req.query.name;
    if (!chapterName) {
        return res.status(400).json({ error: "Missing 'name' parameter" });
    }

    try {
        const response = await axios.get("YOUR_CHAT_API_ENDPOINT", {
            params: { name: chapterName },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
