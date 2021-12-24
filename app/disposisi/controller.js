const { Op } = require("sequelize");
const {
  surat_masuk,
  tujuan,
  disposisi,
  surat_tujuan,
} = require("../../models");
const validation = require("../../validation/disposisi");

// relasi table many to one
surat_masuk.hasOne(disposisi, { foreignKey: "id_surat" });
disposisi.belongsTo(surat_masuk, { foreignKey: "id_surat", as: "surat" });

// relasi tabel many to many
disposisi.belongsToMany(tujuan, {
  through: "surat_tujuan",
  foreignKey: "id_surat",
  as: "tujuan_disposisi",
});
tujuan.belongsToMany(disposisi, {
  through: "surat_tujuan",
  foreignKey: "id_tujuan",
});

module.exports = {
  // get all disposisi
  index: async (req, res) => {
    try {
      // jika berhasil

      // mengambil parameter
      const search = req.query.cari || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const offset = 0 + (page - 1) * limit;

      // mengambil data ke database
      const data = await disposisi.findAndCountAll({
        where: {
          [Op.or]: [
            {
              catatan_sekretaris: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              catatan_kepala: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        limit: limit,
        offset: offset,
        attributes: [
          "id",
          "id_surat",
          "keamanan",
          "catatan_sekretaris",
          "catatan_kepala",
          "catatan_pengasuh",
          "status",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_disposisi",
          },
          {
            model: surat_masuk,
            as: "surat",
            attributes: [
              "uuid",
              "asal",
              "tanggal_terima",
              "tanggal_surat",
              "nomer_surat",
              "perihal",
              "nomer_agenda",
            ],
            include: {
              model: tujuan,
              as: "tujuan_surat",
            },
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

  // get detail disposisi by Id
  detailById: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await disposisi.findOne({
        attributes: [
          "id",
          "id_surat",
          "keamanan",
          "catatan_sekretaris",
          "catatan_kepala",
          "catatan_pengasuh",
          "status",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_disposisi",
          },
          {
            model: surat_masuk,
            as: "surat",
            attributes: [
              "uuid",
              "asal",
              "tanggal_terima",
              "tanggal_surat",
              "nomer_surat",
              "perihal",
              "nomer_agenda",
            ],
            include: {
              model: tujuan,
              as: "tujuan_surat",
            },
          },
        ],
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
          message: "Disposisi tidak ditemukan",
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

  // get detail disposisi by uuid
  detailByUuid: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await disposisi.findOne({
        attributes: [
          "id",
          "id_surat",
          "keamanan",
          "catatan_sekretaris",
          "catatan_kepala",
          "catatan_pengasuh",
          "status",
        ],
        include: [
          {
            model: tujuan,
            as: "tujuan_disposisi",
          },
          {
            model: surat_masuk,
            as: "surat",
            attributes: [
              "uuid",
              "asal",
              "tanggal_terima",
              "tanggal_surat",
              "nomer_surat",
              "perihal",
              "nomer_agenda",
            ],
            include: {
              model: tujuan,
              as: "tujuan_surat",
            },
          },
        ],
        where: {
          id_surat: req.params.uuid,
        },
      });

      // cek apakah ada data
      if (!data) {
        // jika tidak ada data

        // response kosong
        res.status(404).json({
          statusCode: 404,
          error: "NOT FOUND",
          message: "Disposisi tidak ditemukan",
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

  // create disposisi
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

        // cek apakah sudah disposisi
        const surat = await surat_masuk.findOne({
          where: {
            uuid: req.params.uuid,
          },
        });

        if (surat.isDisposisi == "Y") {
          // respon bad request
          res.status(400).json({
            statusCode: 400,
            err: "BAD REQUEST",
            message: "surat sudah selesai di disposisi",
          });
        } else {
          // insert data ke database
          const data = await disposisi.create({
            id_surat: req.params.uuid,
            keamanan: value.keamanan,
            catatan_sekretaris: value.catatan_sekretaris,
            catatan_kepala: value.catatan_kepala,
            catatan_pengasuh: value.catatan_pengasuh,
            status: "Proses",
          });

          // mapping dan insert tujuan
          const dataTujuan = value.tujuan.map((tj) => {
            return {
              id_surat: data.id,
              id_tujuan: tj,
            };
          });

          await surat_tujuan.bulkCreate(dataTujuan);

          // response berhasil
          res.status(201).json({
            message: "Berhasil menambahkan disposisi surat",
          });
        }
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

  // update disposisi
  end: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await disposisi.findOne({
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
          message: "Disposisi tidak ditemukan",
        });
      } else {
        // jika ada data

        // jika berhasil

        // cari surat
        const surat = await surat_masuk.findOne({
          where: {
            uuid: data.id_surat,
          },
        });

        // update data ke database
        await data.update({
          status: "Selesai",
        });

        await surat.update({
          isDisposisi: "Y",
        });

        // response berhasil
        res.status(201).json({
          message: "Disposisi selesai",
        });
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

  // update disposisi
  edit: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await disposisi.findOne({
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
          message: "Disposisi tidak ditemukan",
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
            keamanan: value.keamanan,
            catatan_sekretaris: value.catatan_sekretaris,
            catatan_kepala: value.catatan_kepala,
            catatan_pengasuh: value.catatan_pengasuh,
            status: "Proses",
          });

          // response berhasil
          res.status(201).json({
            message: "Berhasil mengubah disposisi",
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

  // delete disposisi
  destroy: async (req, res) => {
    try {
      // jika berhasil

      // mengambil data ke database
      const data = await disposisi.findOne({
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
          message: "Disposisi tidak ditemukan",
        });
      } else {
        // jika ada data

        // delete data dari database
        await data.destroy();

        // response berhasil
        res.status(200).json({
          message: "Berhasil menghapus disposisi",
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
