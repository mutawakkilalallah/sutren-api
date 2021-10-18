const express = require("express");
const router = express.Router();
const { index, detail, create, update, destroy } = require("./controller");
const validationCreate = require("../../validation/surat-masuk-validation-create");
const authentication = require("../../middlewares/auth");

// routing data semua surat
router.get("/", authentication, index);
// routing data surat
router.get("/:uuid", authentication, detail);
// routing tambah surat
router.post("/", authentication, validationCreate, create);
// routing edit surat
router.put("/:uuid", authentication, update);
// routing delete surat
router.delete("/:uuid", authentication, destroy);

module.exports = router;
