const express = require("express");
const router = express.Router();
const { create } = require("./controller");

// routing daftar user
router.post("/", create);

module.exports = router;
