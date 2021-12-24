const { Op } = require("sequelize");
const fs = require("fs");
const {
  surat_keluar,
  tujuan,
  pengesahan,
  user,
  document,
  jenis,
  surat_tujuan,
  surat_pengesahan,
} = require("../../models");
const validation = require("../../validation/surat-keluar");

// relasi table many to one
user.hasOne(surat_keluar, { foreignKey: "createdBy" });
surat_keluar.belongsTo(user, { foreignKey: "createdBy", as: "created_by" });
user.hasOne(surat_keluar, { foreignKey: "updatedBy" });
surat_keluar.belongsTo(user, { foreignKey: "updatedBy", as: "updated_by" });
jenis.hasOne(surat_keluar, { foreignKey: "id_jenis" });
surat_keluar.belongsTo(jenis, { foreignKey: "id_jenis", as: "jenis_surat" });

surat_keluar.hasOne(document, { foreignKey: "id_surat", as: "document" });
document.belongsTo(surat_keluar, { foreignKey: "id_surat" });

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
      const jenisFilter = req.query.jenis || "";
      const tujuanFilter = req.query.tujuan || "";
      const pengesahanFilter = req.query.pengesahan || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await surat_keluar.findAndCountAll({
        where: {
          [Op.and]: [
            {
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
            {
              id_jenis: {
                [Op.like]: "%" + jenisFilter + "%",
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
          "isPublic",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: jenis,
            as: "jenis_surat",
          },
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
            model: pengesahan,
            as: "pengesahan_surat",
            where: {
              id: {
                [Op.like]: "%" + pengesahanFilter + "%",
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

  // get detail surat keluar
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
          "isPublic",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: jenis,
            as: "jenis_surat",
          },
          {
            model: tujuan,
            as: "tujuan_surat",
          },
          {
            model: pengesahan,
            as: "pengesahan_surat",
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

  // create surat keluar
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
        const data = await surat_keluar.create({
          nomer_surat: value.nomer_surat,
          perihal: value.perihal,
          isi: value.isi,
          tanggal_surat: value.tanggal_surat,
          id_jenis: value.id_jenis,
          isPublic: value.isPublic,
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
          uuid_surat: data.uuid,
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

  // delete surat keluar
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

  // filter
  filter: async (req, res) => {
    try {
      // get filter ke database
      const dataJenis = await jenis.findAndCountAll({
        attributes: ["id", "nama"],
      });
      const dataTujuan = await tujuan.findAndCountAll({
        attributes: ["id", "nama"],
      });
      const dataPengesahan = await pengesahan.findAndCountAll({
        attributes: ["id", "nama"],
      });

      // response berhasil
      res.status(200).json([
        {
          jenis: dataJenis.rows,
        },
        {
          tujuan: dataTujuan.rows,
        },
        {
          pengesahan: dataPengesahan.rows,
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
