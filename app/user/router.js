const express = require("express");
const router = express.Router();
const {
  create,
  login,
  update,
  detail,
  destroy,
  index,
} = require("./controller");
const validationCreate = require("../../validation/user-validation-create");
const validationLogin = require("../../validation/user-validation-login");
const validationUpdate = require("../../validation/user-validation-update");
const authentication = require("../../middlewares/authentication");
const { sysadmin } = require("../../middlewares/authorization");

// routing semua data user
router.get("/", authentication, sysadmin, index);
// routing daftar user
router.post("/register", authentication, sysadmin, validationCreate, create);
// routing login user
router.post("/login", validationLogin, login);
// routing edit user
router.put("/:uuid", authentication, sysadmin, validationUpdate, update);
// routing detail user
router.get("/:uuid", authentication, sysadmin, detail);
// routing delete user
router.delete("/:uuid", authentication, sysadmin, destroy);

module.exports = router;
