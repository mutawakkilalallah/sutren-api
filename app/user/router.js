const express = require("express");
const router = express.Router();
const {
  create,
  login,
  update,
  index,
  destroy,
  detail,
} = require("./controller");
const authentication = require("../../middlewares/authentication");
const { sysadmin } = require("../../middlewares/authorization");

// routing semua data user
router.get("/", authentication, sysadmin, index);
// routing daftar user
router.post("/create", authentication, sysadmin, create);
// routing login user
router.post("/login", login);
// routing edit user
router.put("/:uuid", authentication, sysadmin, update);
// routing detail user
router.get("/:uuid", authentication, sysadmin, detail);
// routing delete user
router.delete("/:uuid", authentication, sysadmin, destroy);

module.exports = router;
