const express = require("express");
const { index, detail, create, edit, destroy } = require("./controller");
const router = express.Router();
const { sysadmin } = require("../../middlewares/authorization");

// get all document
router.get("/", index);

// get document
router.get("/:id", detail);

// get document
router.post("/", sysadmin, create);

// delete document
router.put("/:id", edit);

// delete document
router.delete("/:id", destroy);

module.exports = router;
