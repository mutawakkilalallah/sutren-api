const express = require("express");
const {
  index,
  create,
  detailByUuid,
  detailById,
  destroy,
  edit,
  end,
} = require("./controller");
const router = express.Router();
const { admin } = require("../../middlewares/authorization");

// routing data semua disposisi
router.get("/", admin, index);

// routing data disposisi by uuid
router.get("/surat/:uuid", admin, detailByUuid);

// routing data disposisi by id
router.get("/:id", admin, detailById);

// routing tambah disposisi
router.post("/:uuid", admin, create);

// routing edit disposisi
router.put("/selesai/:id", admin, end);

// routing edit disposisi
router.put("/:id", admin, edit);

// routing delete disposisi
router.delete("/:id", admin, destroy);

module.exports = router;
