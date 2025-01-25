const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const CHAT_API_URL = "https://gizmo.openai.com/gizmo-api/";

// מסלול לשליפת מידע על פרקים
app.get("/chapter", async (req, res) => {
  const chapterName = req.query.name;
  if (!chapterName) {
    return res.status(400).json({ error: "Missing 'name' parameter" });
  }

  try {
    const response = await axios.get(`${CHAT_API_URL}/chapter`, {
      params: { name: chapterName },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from chat API:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
