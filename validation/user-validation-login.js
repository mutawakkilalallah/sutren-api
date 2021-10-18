const { check, validationResult } = require("express-validator");

// kolom create yang akan divalidasi
const rulesLogin = [
  check("username")
    .notEmpty()
    .withMessage("username harus diisi")
    .isLength({ min: 8, max: 12 })
    .withMessage("username minimal 6 digit dan maksimal 12 digit"),
  check("password")
    .notEmpty()
    .withMessage("password harus diisi")
    .isLength({ min: 8 })
    .withMessage("password minimal 8 digit"),
];

// proses validasi
const validationLogin = [
  rulesLogin,
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

module.exports = validationLogin;
