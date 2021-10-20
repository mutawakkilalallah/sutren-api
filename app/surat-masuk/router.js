const express = require("express");
const router = express.Router();
const { index, detail, create, update, destroy } = require("./controller");
const validationCreate = require("../../validation/surat-masuk-validation-create");
// const authentication = require("../../middlewares/authentication");

// routing data semua surat
router.get("/", index);
// routing data surat
router.get("/:uuid", detail);
// routing tambah surat
router.post("/", validationCreate, create);
// routing edit surat
router.put("/:uuid", update);
// routing delete surat
router.delete("/:uuid", destroy);

module.exports = router;
