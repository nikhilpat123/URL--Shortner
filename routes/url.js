const express = require('express');
const {
  handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleGetOriginalUrl,
} = require("../controllers/url");
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleGetOriginalUrl);

module.exports = router;