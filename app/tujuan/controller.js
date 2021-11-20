const { Op } = require("sequelize");
const { tujuan } = require("../../models");
const validation = require("../../validation/tujuan");

module.exports = {
  // get all tujuan
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil parameter
      const search = req.query.cari || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await tujuan.findAndCountAll({
        where: {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        limit: limit,
        offset: offset,
      });

      // cek apakah ada data
      if (data.count < 1) {
        // jika tidak ada data

        // response kosong
        res.status(200).json([]);
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

  // get detail tujuan
  detail: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await tujuan.findOne({
        where: {
          id: req.params.id,
        },
      });

      // cek apakah ada data
      if (!data) {
        // jika tidak ada data

        // response kosong
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "Tujuan tidak ditemukan",
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

  // create tujuan
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

        // insert data ke database
        await tujuan.create(value);

        // response berhasil
        res.status(200).json({
          message: "Berhasil menambahkan tujuan",
        });
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

  // edit tujuan
  edit: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await tujuan.findOne({
        where: {
          id: req.params.id,
        },
      });

      // cek apakah ada data
      if (!data) {
        // jika tidak ada data

        // response kosong
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "Tujuan tidak ditemukan",
        });
      } else {
        // jika ada data

        // cek hasil validasi
        const { error, value } = validation.edit.validate(req.body);
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

          // insert data ke database
          await data.update(value);

          // response berhasil
          res.status(201).json({
            message: "Berhasil mengubah tujuan",
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

  // delete tujuan
  destroy: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await tujuan.findOne({
        where: {
          id: req.params.id,
        },
      });

      // cek apakah ada data
      if (!data) {
        // jika tidak ada data

        // response kosong
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "Tujuan tidak ditemukan",
        });
      } else {
        // jika ada data

        // delete data dari database
        await data.destroy();

        // response berhasil
        res.status(201).json({
          message: "Berhasil menghapus tujuan",
        });
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
