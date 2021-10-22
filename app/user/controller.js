require("dotenv").config();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = process.env;

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
};
