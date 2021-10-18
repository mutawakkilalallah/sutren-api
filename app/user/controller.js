const { User } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = {
  // menambahkan user baru
  create: async (req, res) => {
    try {
      // jika berhasil menambahkan user

      // cek user sesuai username
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      // cek username apakah ada
      if (user) {
        res.status(409).json({
          message: "username sudah ada",
        });
      }
      // hashing password
      const password = await bcrypt.hash(req.body.password, 10);
      // menambahkan user ke database
      await User.create({
        nama: req.body.nama,
        username: req.body.username,
        password: password,
      });
      // response berhasil
      res.status(201).json({
        message: "success created user",
      });
    } catch (error) {
      // jika gagal menambahkan user

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err,
      });
    }
  },
};
