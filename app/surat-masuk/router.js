const express = require("express");
const router = express.Router();
const { index, detail, create, update, destroy } = require("./controller");
const validationCreate = require("../../validation/surat-masuk-validation-create");
const { admin } = require("../../middlewares/authorization");

// routing data semua surat
router.get("/", index);
// routing data surat
router.get("/:uuid", detail);
// routing tambah surat
router.post("/", admin, validationCreate, create);
// routing edit surat
router.put("/:uuid", admin, update);
// routing delete surat
router.delete("/:uuid", admin, destroy);

module.exports = router;
