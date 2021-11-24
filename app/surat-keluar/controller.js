const { Op } = require("sequelize");
const fs = require("fs");
const {
  surat_keluar,
  tujuan,
  pengesahan,
  user,
  surat_tujuan,
  surat_pengesahan,
} = require("../../models");
const validation = require("../../validation/surat-keluar");

// relasi table many to one
user.hasOne(surat_keluar, { foreignKey: "createdBy" });
surat_keluar.belongsTo(user, { foreignKey: "createdBy", as: "created_by" });

// relasi tabel many to many
surat_keluar.belongsToMany(tujuan, {
  through: "surat_tujuan",
  foreignKey: "id_surat",
  as: "tujuan_surat",
});
tujuan.belongsToMany(surat_keluar, {
  through: "surat_tujuan",
  foreignKey: "id_tujuan",
});
surat_keluar.belongsToMany(pengesahan, {
  through: "surat_pengesahan",
  foreignKey: "id_surat",
  as: "pengesahan_surat",
});
pengesahan.belongsToMany(surat_keluar, {
  through: "surat_pengesahan",
  foreignKey: "id_pengesahan",
});

module.exports = {
  // get all surat keluar
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
          "lampiran",
          "perihal",
          "isi",
          "tanggal_surat",
          "document",
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
            attributes: [
              "uuid",
              "nama",
              "username",
              "akses",
              "picture",
              "createdAt",
            ],
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

  // get detail surat keluar
  detail: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await surat_keluar.findOne({
        attributes: [
          "uuid",
          "nomer_surat",
          "lampiran",
          "perihal",
          "isi",
          "tanggal_surat",
          "document",
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
            attributes: [
              "uuid",
              "nama",
              "username",
              "akses",
              "picture",
              "createdAt",
            ],
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

  // create surat keluar
  create: async (req, res) => {
    try {
      // jika berhasil

      // cek hasil validasi
      const { error, value } = validation.create.validate(req.body);
      console.log(value);
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
        const data = await surat_keluar.create({
          nomer_surat: value.nomer_surat,
          lampiran: value.lampiran,
          perihal: value.perihal,
          isi: value.isi,
          tanggal_surat: value.tanggal_surat,
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

        // mapping dan insert pengesahan
        const dataPengesahan = value.pengesahan.map((tj) => {
          return {
            id_surat: data.uuid,
            id_pengesahan: tj,
          };
        });

        await surat_pengesahan.bulkCreate(dataPengesahan);

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

  // update surat keluar
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

          // cek apakah update document
          if (!req.files.document) {
            // jika tidak ada document

            // tetapkan document sebelumnya
            var document = data.document;
          } else {
            // jika ada document

            // ganti url baru
            var document = req.files.document[0].path;
          }

          // insert data ke database
          await data.update({
            nomer_surat: value.nomer_surat,
            lampiran: value.lampiran,
            perihal: value.perihal,
            isi: value.isi,
            tanggal_surat: value.tanggal_surat,
            updatedBy: req.uuid,
            document: document,
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

  // delete tujuan
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
      } else if (data.document) {
        // jika ada data dan ada dokumen

        // hapus dokumen
        fs.unlinkSync(data.document);

        // delete data dari database
        await data.destroy();
      } else {
        // jika tidak ada dokumen

        // delete data dari database
        await data.destroy();
      }

      // response berhasil
      res.status(200).json({
        message: "Berhasil menghapus surat",
      });
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
