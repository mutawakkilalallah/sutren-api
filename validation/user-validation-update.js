const { check, validationResult } = require("express-validator");

// kolom create yang akan divalidasi
const rulesUpdate = [
  check("nama")
    .notEmpty()
    .withMessage("nama user harus diisi")
    .isString()
    .withMessage("nama user harus tidak boleh angka"),
  check("password")
    .notEmpty()
    .withMessage("password harus diisi")
    .isLength({ min: 8 })
    .withMessage("password minimal 8 digit"),
];

// proses validasi
const validationUpdate = [
  rulesUpdate,
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

module.exports = validationUpdate;
