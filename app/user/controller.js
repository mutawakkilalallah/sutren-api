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
          statusCode: 403,
          error: "FORBIDDEN",
          message: "username sudah terdaftar",
        });
      } else {
        // cek gambar
        if (!req.files.picture) {
          // jika tidak ada gambar

          // response bad request
          return res.status(400).json({
            statusCode: 400,
            error: "BAD REQUEST",
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
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
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
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
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
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
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
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
      });
    }
  },

  // menghapus data user
  destroy: async (req, res) => {
    try {
      // jika berhasil menghapus data user

      // mengambil parameter uuid
      const uuid = req.params.uuid;
      // menghapus picture yang lama
      const data = await User.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (data < 1) {
        // jika tidak ada data user
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "user tidak ditemukan",
        });
      } else {
        // jika ada data user
        fs.unlinkSync(data.picture);
        // Delete dari database
        await User.destroy({
          where: {
            uuid: uuid,
          },
        });
        // response berhasil
        res.status(200).json({
          message: "berhasil menghapus user",
        });
      }
    } catch (err) {
      // jika gagal edit user

      // response server error
      res.status(500).json({
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
      });
    }
  },

  // mengambil data user berdasarkan uuid
  detail: async (req, res) => {
    // mengambil parameter uuid
    const uuid = req.params.uuid;
    // mengambil data user berdasarkan uuid
    try {
      // jika berhasil mengambil data user
      const data = await User.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (data < 1) {
        // jika tidak ada data user

        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "user tidak ditemukan",
        });
      } else {
        // jika ada data user

        // response berhasil
        res.status(200).json(data);
      }
    } catch (err) {
      // jika gagal mengambil data user

      // response server error
      res.status(500).json({
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
      });
    }
  },

  // mengambil semua data user
  index: async (req, res) => {
    try {
      // mengambil query parameter
      const search = req.query.cari;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 3;
      const offset = 0 + (page - 1) * limit;
      // jika berhasil mengambil semua data user

      // jika tidak ada pencarian
      if (!search) {
        const data = await User.findAndCountAll({
          order: [["createdAt", "DESC"]],
          limit: limit,
          offset: offset,
        });
        const totalData = data.count;
        const totalPage = Math.ceil(totalData / limit);

        if (totalData < 1) {
          // jika tidak ada semua user

          // response array kosong
          empetyData = [];
          res.status(200).json(empetyData);
        } else {
          // jika ada semua surat  masuk

          // response berhasil
          res
            .status(200)
            .set({
              "x-data-total": totalData,
              "x-pagination-data-limit": limit,
              "x-pagination-total-page": totalPage,
            })
            .json(data.rows);
        }
      } else {
        const data = await User.findAndCountAll({
          where: {
            [Op.or]: [
              {
                asal: {
                  [Op.like]: "%" + search + "%",
                },
              },
              {
                tujuan: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
          order: [["createdAt", "DESC"]],
          limit: limit,
          offset: offset,
        });
        const totalData = data.count;
        const totalPage = Math.ceil(totalData / limit);

        if (totalData < 1) {
          // jika tidak ada semua user

          // response array kosong
          empetyData = [];
          res.status(200).json(empetyData);
        } else {
          // jika ada semua surat  masuk

          // response berhasil
          res
            .status(200)
            .set({
              "x-data-total": totalData,
              "x-pagination-data-limit": limit,
              "x-pagination-total-page": totalPage,
            })
            .json(data.rows);
        }
      }
    } catch (err) {
      // jika gagal mengambil semua data surat  masuk

      // response server error
      res.status(500).json({
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
      });
    }
  },
};
