const express = require("express");
const { index, create, detail, destroy, edit, end } = require("./controller");
const router = express.Router();
const { admin } = require("../../middlewares/authorization");

// routing data semua surat
router.get("/", admin, index);

// routing data surat
router.get("/:id", admin, detail);

// routing tambah surat
router.post("/:uuid", admin, create);

// routing edit surat
router.put("/selesai/:id", admin, end);

// routing edit surat
router.put("/:id", admin, edit);

// routing delete surat
router.delete("/:id", admin, destroy);

module.exports = router;
