const {
  surat_masuk,
  surat_keluar,
  disposisi,
  document,
  user,
} = require("../../models");

module.exports = {
  // dashboard controller
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const total_suratmasuk = await surat_masuk.count();
      const total_suratkeluar = await surat_keluar.count();
      const total_disposisi = await disposisi.count();
      const total_document = await document.count();
      const total_user = await user.count();

      res.status(200).json({
        total_suratmasuk,
        total_suratkeluar,
        total_disposisi,
        total_document,
        total_user,
      });
    } catch (err) {
      // jika error

      // response error
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },
};
