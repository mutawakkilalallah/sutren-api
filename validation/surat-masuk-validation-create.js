const { check, validationResult } = require("express-validator");

// kolom create yang akan divalidasi
const rulesCreate = [
  check("nomer_urut").notEmpty().withMessage("nomer urut surat harus diisi"),
  check("nomer_agenda")
    .notEmpty()
    .withMessage("nomer agenda surat harus diisi"),
  check("kode_arsip").notEmpty().withMessage("kode arsip surat harus diisi"),
  check("tanggal_terima")
    .notEmpty()
    .withMessage("tanggal terima surat harus diisi"),
  check("tanggal_surat")
    .notEmpty()
    .withMessage("tanggal surat surat harus diisi"),
  check("asal").notEmpty().withMessage("asal surat harus diisi"),
  check("alamat").notEmpty().withMessage("alamat surat harus diisi"),
  check("nomer_surat")
    .notEmpty()
    .withMessage("tanggal surat surat harus diisi"),
  check("tujuan").notEmpty().withMessage("tujuan surat harus diisi"),
  check("perihal").notEmpty().withMessage("perihal surat harus diisi"),
  check("keterangan").notEmpty().withMessage("keterangan surat harus diisi"),
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
