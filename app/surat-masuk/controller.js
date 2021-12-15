const { Op } = require("sequelize");
const fs = require("fs");
const {
  surat_masuk,
  tujuan,
  user,
  document,
  surat_tujuan,
} = require("../../models");
const validation = require("../../validation/surat-masuk");
// const tujuan = require("../../validation/tujuan");

// relasi table many to one
user.hasOne(surat_masuk, { foreignKey: "createdBy" });
surat_masuk.belongsTo(user, { foreignKey: "createdBy", as: "created_by" });
user.hasOne(surat_masuk, { foreignKey: "updatedBy" });
surat_masuk.belongsTo(user, { foreignKey: "updatedBy", as: "updated_by" });

surat_masuk.hasOne(document, { foreignKey: "id_surat", as: "document" });
document.belongsTo(surat_masuk, { foreignKey: "id_surat" });

user.hasOne(document, { foreignKey: "createdBy" });
document.belongsTo(user, {
  foreignKey: "createdBy",
  as: "created_by",
});
user.hasOne(document, { foreignKey: "updatedBy" });
document.belongsTo(user, {
  foreignKey: "updatedBy",
  as: "updated_by",
});

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
      const tujuanFilter = req.query.tujuan || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await surat_masuk.findAndCountAll({
        where: {
          [Op.or]: [
            {
              asal: {
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
          "nomer_urut",
          "nomer_agenda",
          "kode_arsip",
          "tanggal_terima",
          "tanggal_surat",
          "nomer_surat",
          "asal",
          "alamat",
          "perihal",
          "keterangan",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_surat",
            where: {
              id: {
                [Op.like]: "%" + tujuanFilter + "%",
              },
            },
          },
          {
            model: document,
            as: "document",
            attributes: [
              "id",
              "id_surat",
              "kategori",
              "url",
              "createdAt",
              "updatedAt",
            ],
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
          },
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
      const data = await surat_masuk.findOne({
        attributes: [
          "uuid",
          "nomer_urut",
          "nomer_agenda",
          "kode_arsip",
          "tanggal_terima",
          "tanggal_surat",
          "nomer_surat",
          "asal",
          "alamat",
          "perihal",
          "keterangan",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_surat",
          },
          {
            model: document,
            as: "document",
            attributes: [
              "id",
              "id_surat",
              "kategori",
              "url",
              "createdAt",
              "updatedAt",
            ],
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
          },
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
          nomer_urut: value.nomer_urut,
          nomer_agenda: value.nomer_agenda,
          kode_arsip: value.kode_arsip,
          tanggal_terima: value.tanggal_terima,
          tanggal_surat: value.tanggal_surat,
          nomer_surat: value.nomer_surat,
          asal: value.asal,
          alamat: value.alamat,
          perihal: value.perihal,
          keterangan: value.keterangan,
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
      const data = await surat_masuk.findOne({
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
          message: "surat tidak ditemukan",
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
            nomer_urut: value.nomer_urut,
            nomer_agenda: value.nomer_agenda,
            kode_arsip: value.kode_arsip,
            tanggal_terima: value.tanggal_terima,
            tanggal_surat: value.tanggal_surat,
            nomer_surat: value.nomer_surat,
            asal: value.asal,
            alamat: value.alamat,
            perihal: value.perihal,
            keterangan: value.keterangan,
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
      const data = await surat_masuk.findOne({
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
          message: "surat tidak ditemukan",
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

  // filter
  filter: async (req, res) => {
    try {
      // get tujuan ke database
      const dataTujuan = await tujuan.findAndCountAll({
        attributes: ["id", "nama"],
      });

      // response berhasil
      res.status(200).json([
        {
          tujuan: dataTujuan.rows,
        },
      ]);
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
