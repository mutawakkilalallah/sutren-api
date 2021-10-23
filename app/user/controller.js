require("dotenv").config();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = process.env;
const fs = require("fs");

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
          code: 409,
          status: "CONFLICT",
          message: "username sudah ada",
        });
      } else {
        // cek gambar
        if (!req.files.picture) {
          // jika tidak ada gambar

          // response bad request
          return res.status(400).json({
            code: 400,
            status: "BAD REQUEST",
            message: "gambar harus disertakan dengan format png, jpeg atau jpg",
          });
        }
        // hashing password
        const password = await bcrypt.hash(req.body.password, 10);
        // menambahkan user ke database
        await User.create({
          nama: req.body.nama,
          username: req.body.username,
          password: password,
          akses: req.body.akses,
          picture: req.files.picture[0].path,
        });
        // response berhasil
        res.status(201).json({
          message: "berhasil menambahkan user",
        });
      }
    } catch (err) {
      // jika gagal menambahkan user

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err.message,
      });
    }
  },

  // login
  login: async (req, res) => {
    try {
      // jika berhasil  login

      // mengambil data inputan
      username = req.body.username;
      password = req.body.password;

      // cek apakah ada user
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      // jika username salah
      if (!user) {
        res.status(404).json({
          code: 404,
          status: "NOT FOUND",
          message: "invalid username",
        });
      }
      // jika password salah
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(404).json({
          code: 404,
          status: "NOT FOUND",
          message: "invalid password",
        });
      }
      // generate jwt token
      const token = await jwt.sign({ uuid: user.uuid }, JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      // response berhasil
      res
        .status(200)
        .set({
          "x-sutren-token": token,
        })
        .json({
          message: "berhasil login",
        });
    } catch (err) {
      // jika gagal login

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada ini",
        message: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      // jika berhasil edit user

      // mengambil parameter uuid
      const uuid = req.params.uuid;
      // cek user di database
      const data = await User.findOne({
        where: {
          uuid: uuid,
        },
      });
      // cek hasil data di database
      if (data < 1) {
        // jika tidak ada data user
        res.status(200).json({
          message: "user tidak ditemukan",
        });
      } else {
        // cek apakah mengubah gambar
        if (!req.files.picture) {
          // jika tidak mengubah gambar

          // hashing password
          const password = await bcrypt.hash(req.body.password, 10);
          // update ke database
          await User.update(
            {
              nama: req.body.nama,
              password: password,
            },
            {
              where: {
                uuid: uuid,
              },
            }
          );
        } else {
          // jika mengubah gambar

          // menghapus gambar yang lama
          fs.unlinkSync(data.picture);

          // hashing password
          const password = await bcrypt.hash(req.body.password, 10);
          // update ke database
          await User.update(
            {
              nama: req.body.nama,
              password: password,
              picture: req.files.picture[0].path,
            },
            {
              where: {
                uuid: uuid,
              },
            }
          );
        }
        // response berhasil
        res.status(201).json({
          message: "berhasil mengubah user",
        });
      }
    } catch (err) {
      // jika gagal mengubah data user

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err.message,
      });
    }
  },

  // menghapus data surat
  destroy: async (req, res) => {
    try {
      // jika berhasil menghapus data surat

      // mengambil parameter uuid
      const uuid = req.params.uuid;
      // menghapus document yang lama
      const data = await SuratMasuk.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (data < 1) {
        // jika tidak ada data surat
        res.status(200).json({
          message: "Surat tidak ditemukan",
        });
      } else {
        // jika ada data surat
        fs.unlinkSync(data.document);
        // Delete dari database
        await SuratMasuk.destroy({
          where: {
            uuid: uuid,
          },
        });
        // response berhasil
        res.status(200).json({
          message: "berhasil menghapus surat",
        });
      }
    } catch (err) {
      // jika gagal edit user

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada ini",
        message: err.message,
      });
    }
  },
};
