const express = require("express");
const { index } = require("./controller");
const router = express.Router();

router.get("/dashboard", index);

module.exports = router;
