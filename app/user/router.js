const express = require("express");
const router = express.Router();
const { create, login } = require("./controller");
const validationCreate = require("../../validation/user-validation-create");
const validationLogin = require("../../validation/user-validation-login");
const authentication = require("../../middlewares/authentication");
const { sysadmin } = require("../../middlewares/authorization");

// routing daftar user
router.post("/register", authentication, sysadmin, validationCreate, create);
// routing login user
router.post("/login", validationLogin, login);

module.exports = router;
