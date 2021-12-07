const express = require("express");
const {
  index,
  detail,
  create,
  edit,
  destroy,
  filter,
} = require("./controller");
const router = express.Router();
const { sysadmin } = require("../../middlewares/authorization");

// get all tujuan
router.get("/", sysadmin, index);

// get tujuan
router.get("/:id", sysadmin, detail);

// get tujuan
router.post("/", sysadmin, create);

// delete tujuan
router.put("/:id", sysadmin, edit);

// delete tujuan
router.delete("/:id", sysadmin, destroy);

module.exports = router;
