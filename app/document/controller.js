const { Op } = require("sequelize");
const { document, user } = require("../../models");
const validation = require("../../validation/document");
const fs = require("fs");

module.exports = {
  // get all document
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil parameter
      const search = req.query.cari || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await document.findAndCountAll({
        where: {
          kategori: {
            [Op.like]: "%" + search + "%",
          },
        },
        include: [
          {
            model: user,
            as: "created_by",
            attributes: ["uuid", "nama", "username", "akses", "createdAt"],
          },
          {
            model: user,
            as: "updated_by",
            attributes: ["uuid", "nama", "username", "akses", "createdAt"],
          },
        ],
        limit: limit,
        offset: offset,
      });

      // cek apakah ada data
      if (data.rows.length < 1) {
        // jika tidak ada data

        // response kosong
        res
          .status(200)
          .set({
            "x-data-total": data.rows.length,
            "x-pagination-data-limit": limit,
            "x-pagination-total-page": Math.ceil(data.rows.length / limit),
          })
          .json([]);
      } else {
        // jika ada data

        // response berhasil
        res
          .status(200)
          .set({
            "x-data-total": data.rows.length,
            "x-pagination-data-limit": limit,
            "x-pagination-total-page": Math.ceil(data.rows.length / limit),
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

  // get detail document
  detail: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await document.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: user,
            as: "created_by",
            attributes: ["uuid", "nama", "username", "akses", "createdAt"],
          },
          {
            model: user,
            as: "updated_by",
            attributes: ["uuid", "nama", "username", "akses", "createdAt"],
          },
        ],
      });

      // cek apakah ada data
      if (!data) {
        // jika tidak ada data

        // response kosong
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "dokumen tidak ditemukan",
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

  // create document
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

        // cek apakah ada dokumen
        if (!req.files.document) {
          //  jika tidak ada

          // respon bad request
          res.status(400).json({
            statusCode: 400,
            err: "BAD REQUEST",
            message: "dokumen harus dilampirkan dengan format pdf",
          });
        } else {
          // jika ada

          // insert data ke database
          await document.create({
            id_surat: value.id_surat,
            kategori: value.kategori,
            url: req.files.document[0].path,
            createdBy: req.uuid,
            updatedBy: req.uuid,
          });

          // response berhasil
          res.status(200).json({
            message: "Berhasil menambahkan dokumen",
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

  // edit document
  edit: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await document.findOne({
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
          message: "dokumen tidak ditemukan",
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

          // cek apakah ada dokumen
          if (req.files.document) {
            fs.unlinkSync(data.url);
          }

          // update data ke database
          await data.update({
            id_surat: value.id_surat,
            kategori: value.kategori,
            url: req.files.document[0].path,
          });

          // response berhasil
          res.status(201).json({
            message: "Berhasil mengubah dokumen",
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

  // delete document
  destroy: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await document.findOne({
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
          message: "dokumen tidak ditemukan",
        });
      } else {
        // jika ada data

        // delete dokumen
        fs.unlinkSync(data.url);

        // delete data dari database
        await data.destroy();

        // response berhasil
        res.status(200).json({
          message: "Berhasil menghapus dokumen",
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
