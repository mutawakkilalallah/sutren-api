const express = require("express");
const { index, detail, create, edit, destroy } = require("./controller");
const router = express.Router();
const { sysadmin } = require("../../middlewares/authorization");

// get all pengesahan
router.get("/", sysadmin, index);

// get pengesahan
router.get("/:id", sysadmin, detail);

// get pengesahan
router.post("/", sysadmin, create);

// delete pengesahan
router.put("/:id", sysadmin, edit);

// delete pengesahan
router.delete("/:id", sysadmin, destroy);

module.exports = router;
