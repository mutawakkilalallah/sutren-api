require("dotenv").config();
const { Op } = require("sequelize");
const { user } = require("../../models");
const validation = require("../../validation/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  // create user
  create: async (req, res) => {
    try {
      // jika berhasil

      // cek hasil validasi
      const { error, value } = validation.create.validate(req.body);
      if (error) {
        // jika terjadi error

        // respon bad request
        res.status(400).json({
          statusCode: 400,
          err: "BAD REQUEST",
          message: error.message,
        });
      } else {
        // jika berhasil

        // cek user sesuai username
        const data = await user.findOne({
          where: {
            username: req.body.username,
          },
        });
        // cek username apakah ada
        if (data) {
          res.status(409).json({
            statusCode: 403,
            error: "FORBIDDEN",
            message: "username sudah terdaftar",
          });
        } else {
          // hashing password
          const password = await bcrypt.hash(value.password, 10);
          // menambahkan user ke database
          await user.create({
            nama: value.nama,
            username: value.username,
            password: password,
            akses: value.akses,
          });

          // response berhasil
          res.status(200).json({
            message: "Berhasil menambahkan user",
          });
        }
      }
    } catch (err) {
      // jika gagal

      // response error
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },

  // login
  login: async (req, res) => {
    try {
      // jika berhasil

      // cek hasil validasi
      const { error, value } = validation.login.validate(req.body);
      if (error) {
        // jika terjadi error

        // respon bad request
        res.status(400).json({
          statusCode: 400,
          err: "BAD REQUEST",
          message: error.message,
        });
      } else {
        // mengambil data inputan
        username = value.username;
        password = value.password;

        // cek apakah ada user
        const data = await user.findOne({
          where: {
            username: username,
          },
        });
        // jika username salah
        if (!data) {
          res.status(401).json({
            code: 401,
            status: "UNAUTHORIZED",
            message: "invalid username",
          });
        }
        // jika password salah
        const validPassword = await bcrypt.compare(password, data.password);
        if (!validPassword) {
          res.status(401).json({
            code: 401,
            status: "UNAUTHORIZED",
            message: "invalid password",
          });
        }
        // generate jwt token
        const token = await jwt.sign(
          { uuid: data.uuid, akses: data.akses, nama: data.nama },
          JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        // response berhasil
        res
          .status(200)
          .set({
            "x-sutren-token": token,
          })
          .json({
            message: "berhasil login",
          });
      }
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

  // update user
  update: async (req, res) => {
    try {
      // jika berhasil edit user

      // cek hasil validasi
      const { error, value } = validation.update.validate(req.body);
      console.log(error, value);
      if (error) {
        // jika terjadi error

        // respon bad request
        res.status(400).json({
          statusCode: 400,
          err: "BAD REQUEST",
          message: error.message,
        });
      } else {
        // cek user di database
        const data = await user.findOne({
          where: {
            uuid: req.params.uuid,
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
          // hashing password
          const password = await bcrypt.hash(req.body.password, 10);
          // update ke database
          await data.update({
            nama: value.nama,
            password: password,
            akses: value.akses,
          });

          // response berhasil
          res.status(201).json({
            message: "berhasil mengubah user",
          });
        }
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

  // menghapus user
  destroy: async (req, res) => {
    try {
      // jika berhasil

      // mencari data
      const data = await user.findOne({
        where: {
          uuid: req.params.uuid,
        },
      });
      if (data < 1) {
        // jika tidak ada data

        // response bad request
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "user tidak ditemukan",
        });
      } else {
        // jika ada data

        // Delete dari database
        await data.destroy();

        // response berhasil
        res.status(200).json({
          message: "berhasil menghapus user",
        });
      }
    } catch (err) {
      // jika gagal
      res.status(500).json({
        statusCode: 500,
        error: err.message,
        message: "Terjadi kesalahan Pada server",
      });
    }
  },

  // get all user
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil parameter
      const search = req.query.cari || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await user.findAndCountAll({
        where: {
          [Op.or]: [
            {
              username: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              nama: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset,
      });

      // cek apakah ada data
      if (data.count < 1) {
        // jika tidak ada data

        // response kosong
        res
          .status(200)
          .set({
            "x-data-total": data.count,
            "x-pagination-data-limit": limit,
            "x-pagination-total-page": Math.ceil(data.count / limit),
          })
          .json([]);
      } else {
        // jika ada data

        // response berhasil
        res
          .status(200)
          .set({
            "x-data-total": data.count,
            "x-pagination-data-limit": limit,
            "x-pagination-total-page": Math.ceil(data.count / limit),
          })
          .json(data.rows);
      }
    } catch (err) {
      // jika gagal

      // response error
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },

  // get detail user
  detail: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await user.findOne({
        where: {
          uuid: req.params.uuid,
        },
      });

      // cek apakah ada data
      if (!data) {
        // jika tidak ada data

        // response kosong
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "user tidak ditemukan",
        });
      } else {
        // jika ada data

        // response berhasil
        res.status(200).json(data);
      }
    } catch (err) {
      // jika gagal

      // response error
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },
};
