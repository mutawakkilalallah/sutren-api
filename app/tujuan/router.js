const express = require("express");
const { index } = require("./controller");
const router = express.Router();

// get all tujuan
router.get("/", index);

module.exports = router;
