const express = require("express");
const { index, create, detail, destroy, edit } = require("./controller");
const router = express.Router();
// const { admin } = require("../../middlewares/authorization");

// routing data semua surat
router.get("/", index);

// routing data surat
router.get("/:uuid", detail);

// routing tambah surat
router.post("/", create);

// routing edit surat
router.put("/:uuid", edit);

// routing delete surat
router.delete("/:uuid", destroy);

module.exports = router;
