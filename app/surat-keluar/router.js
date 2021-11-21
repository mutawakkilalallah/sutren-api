const express = require("express");
const { index, create, detail, destroy, edit } = require("./controller");
const router = express.Router();
const { admin } = require("../../middlewares/authorization");

// routing data semua surat
router.get("/", admin, index);

// routing data surat
router.get("/:uuid", admin, detail);

// routing tambah surat
router.post("/", admin, create);

// routing edit surat
router.put("/:uuid", edit);

// routing delete surat
router.delete("/:uuid", admin, destroy);

module.exports = router;
