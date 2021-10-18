const express = require("express");
const router = express.Router();
const { create, login } = require("./controller");
const validationCreate = require("../../validation/user-validation-create");
const validationLogin = require("../../validation/user-validation-login");
const authentication = require("../../middlewares/auth");

// routing daftar user
router.post("/register", authentication, validationCreate, create);
// routing login user
router.post("/login", validationLogin, login);

module.exports = router;
