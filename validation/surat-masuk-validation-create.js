const { check, validationResult } = require("express-validator");

// kolom create yang akan divalidasi
const rulesCreate = [
  check("nomer").notEmpty().withMessage("nomer surat harus diisi"),
  check("tujuan").notEmpty().withMessage("tujuan surat harus diisi"),
];

// proses validasi
const validationCreate = [
  rulesCreate,
  (req, res, next) => {
    // mengambil data hasil validasi
    const errors = validationResult(req);

    // cek hasil validasi
    if (!errors.isEmpty()) {
      // jika validasi gagal

      // response bad request
      return res.status(400).json({
        code: 400,
        status: "BAD REQUEST",
        message: errors.array()[0].msg,
      });
    }

    // jika validasi berhasil
    next();
  },
];

module.exports = validationCreate;
