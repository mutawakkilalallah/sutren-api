const express = require("express");
const router = express.Router();
const { create, login, update, detail, destroy } = require("./controller");
const validationCreate = require("../../validation/user-validation-create");
const validationLogin = require("../../validation/user-validation-login");
const validationUpdate = require("../../validation/user-validation-update");
const authentication = require("../../middlewares/authentication");
const { sysadmin } = require("../../middlewares/authorization");

// routing daftar user
router.post("/register", authentication, sysadmin, validationCreate, create);
// routing login user
router.post("/login", validationLogin, login);
// routing daftar user
router.put("/edit/:uuid", authentication, sysadmin, validationUpdate, update);
// routing detail user
router.get("/detail/:uuid", authentication, detail);
// routing delete user
router.delete("/delete/:uuid", authentication, sysadmin, destroy);

module.exports = router;
