const express = require("express");
const router = express.Router();
const { create } = require("./controller");
const validationCreate = require("../../validation/user-validation-create");

// routing daftar user
router.post("/", validationCreate, create);

module.exports = router;
