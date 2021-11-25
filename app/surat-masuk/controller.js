const { Op } = require("sequelize");
const fs = require("fs");
const { surat_masuk, tujuan, user, surat_tujuan } = require("../../models");
const validation = require("../../validation/surat-masuk");

// relasi table many to one
user.hasOne(surat_masuk, { foreignKey: "createdBy" });
surat_masuk.belongsTo(user, { foreignKey: "createdBy", as: "created_by" });

// relasi tabel many to many
surat_masuk.belongsToMany(tujuan, {
  through: "surat_tujuan",
  foreignKey: "id_surat",
  as: "tujuan_surat",
});
tujuan.belongsToMany(surat_masuk, {
  through: "surat_tujuan",
  foreignKey: "id_tujuan",
});

module.exports = {
  // get all surat masuk
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil parameter
      const search = req.query.cari || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await surat_keluar.findAndCountAll({
        where: {
          [Op.or]: [
            {
              nomer_surat: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              perihal: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        limit: limit,
        offset: offset,
        attributes: [
          "uuid",
          "nomer_surat",
          "perihal",
          "isi",
          "tanggal_surat",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_surat",
          },
          {
            model: pengesahan,
            as: "pengesahan_surat",
          },
          {
            model: user,
            as: "created_by",
            attributes: ["uuid", "nama", "username", "akses", "createdAt"],
          },
        ],
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

      // response gagal
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },

  // get detail surat masuk
  detail: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await surat_keluar.findOne({
        attributes: [
          "uuid",
          "nomer_surat",
          "perihal",
          "isi",
          "tanggal_surat",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_surat",
          },
          {
            model: pengesahan,
            as: "pengesahan_surat",
          },
          {
            model: user,
            as: "created_by",
            attributes: ["uuid", "nama", "username", "akses", "createdAt"],
          },
        ],
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
          message: "Surat tidak ditemukan",
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

  // create surat masuk
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
        const data = await surat_masuk.create({
          nomer_surat: value.nomer_surat,
          createdBy: req.uuid,
          updatedBy: req.uuid,
        });

        // mapping dan insert tujuan
        const dataTujuan = value.tujuan.map((tj) => {
          return {
            id_surat: data.uuid,
            id_tujuan: tj,
          };
        });

        await surat_tujuan.bulkCreate(dataTujuan);

        // response berhasil
        res.status(201).json({
          message: "Berhasil menambahkan surat",
        });
      }
    } catch (err) {
      // jika gagal

      // response gagal
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },

  // update surat masuk
  edit: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await surat_keluar.findOne({
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
          await data.update({
            nomer_surat: value.nomer_surat,
            perihal: value.perihal,
            isi: value.isi,
            tanggal_surat: value.tanggal_surat,
            updatedBy: req.uuid,
          });

          // response berhasil
          res.status(201).json({
            message: "Berhasil mengubah surat",
          });
        }
      }
    } catch (err) {
      // jika gagal

      console.log(err);

      // response error
      res.status(500).json({
        statusCode: 500,
        err: err.message,
        message: "Internal Server Error",
      });
    }
  },

  // delete surat masuk
  destroy: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await surat_keluar.findOne({
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
          message: "Surat tidak ditemukan",
        });
      } else {
        // jika ada data

        // delete data dari database
        await data.destroy();

        // response berhasil
        res.status(200).json({
          message: "Berhasil menghapus surat",
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
