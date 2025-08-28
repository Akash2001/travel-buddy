const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.FSQ_URL}/places/search`, {
      headers: {
        Authorization: `Bearer ${process.env.FSQ_SERVICE_API_KEY}`,
        'X-Places-Api-Version': '2025-06-17',
        Accept: "application/json",
      },
      params: {
        ...req.query,
        limit: 5,
      },
    });
    res.json(response.data.results);
  } catch (error) {
    console.error("Foursquare API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

module.exports = router;
