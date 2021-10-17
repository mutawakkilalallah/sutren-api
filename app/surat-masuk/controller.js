const { SuratMasuk } = require("../../models");
const fs = require("fs");

module.exports = {
  // mengambil semua data surat masuk
  index: async (req, res) => {
    try {
      // mengambil query parameter
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 3;
      const offset = 0 + (page - 1) * limit;
      // jika berhasil mengambil semua data surat masuk
      const data = await SuratMasuk.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset,
      });
      const totalData = data.count;
      const totalPage = Math.ceil(totalData / limit);

      if (totalData < 1) {
        // jika tidak ada semua surat masuk

        // response not found
        res.status(404).json({
          message: "Surat tidak ditemukan",
        });
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
    } catch (err) {
      // jika gagal mengambil semua data surat  masuk

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err,
      });
    }
  },

  // mengambil data surat berdasarkan uuid
  detail: async (req, res) => {
    // mengambil parameter uuid
    const uuid = req.params.uuid;
    // mengambil data surat berdasarkan uuid
    try {
      // jika berhasil mengambil data surat
      const data = await SuratMasuk.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (data < 1) {
        // jika tidak ada data surat

        // response not found
        res.status(404).json({
          message: "Surat tidak ditemukan",
        });
      } else {
        // jika ada data surat

        // response berhasil
        res.status(200).json(data);
      }
    } catch (err) {
      // jika gagal mengambil data surat

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err,
      });
    }
  },

  // menambahkan data surat
  create: async (req, res) => {
    try {
      // jika berhasil menambah data surat

      // mengambil data inputan
      const nomer = req.body.nomer;
      const tujuan = req.body.tujuan;
      // cek apakah ada document
      if (!req.file) {
        // jika tidak ada document

        // response bad request
        return res.status(400).json({
          code: 400,
          status: "BAD REQUEST",
          message: "dokumen surat harus dilampirkan dengan format pdf",
        });
      } else {
        // jika ada document
        const document = req.file.path;
        // insert data ke database
        await SuratMasuk.create({
          nomer: nomer,
          tujuan: tujuan,
          document: document,
        });
        // response berhasil
        res.status(201).json({
          message: "berhasil menambahkan surat",
        });
      }
    } catch (err) {
      // jika gagal menambah data surat

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err,
      });
    }
  },

  // mengubah data surat
  update: async (req, res) => {
    try {
      // jika berhasil mengubah data surat

      // mengambil parameter uuid
      const uuid = req.params.uuid;
      // cek surat di database
      const data = await SuratMasuk.findOne({
        where: {
          uuid: uuid,
        },
      });
      // mengambil data inputan
      const nomer = req.body.nomer;
      const tujuan = req.body.tujuan;
      if (data < 1) {
        // jika tidak ada data surat
        res.status(200).json({
          message: "Surat tidak ditemukan",
        });
      } else {
        // cek apakah mengubah document
        if (!req.file) {
          // jika tidak mengubah document

          // update ke database
          await SuratMasuk.update(
            {
              nomer: nomer,
              tujuan: tujuan,
            },
            {
              where: {
                uuid: uuid,
              },
            }
          );
        } else {
          // jika mengubah document

          // mengambil data inputan document
          const document = req.file.path;
          // menghapus document yang lama
          fs.unlinkSync(data.document);
          // update ke database
          await SuratMasuk.update(
            {
              nomer: nomer,
              tujuan: tujuan,
              document: document,
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
          message: "berhasil mengubah surat",
        });
      }
    } catch (err) {
      // jika gagal mengubah data surat

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err,
      });
    }
  },

  // menghapus data surat
  destroy: async (req, res) => {
    try {
      // jika berhasil menghapus data surat

      // mengambil parameter uuid
      const uuid = req.params.uuid;
      // menghapus document yang lama
      const data = await SuratMasuk.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (data < 1) {
        // jika tidak ada data surat
        res.status(200).json({
          message: "Surat tidak ditemukan",
        });
      } else {
        // jika ada data surat
        fs.unlinkSync(data.document);
        // Delete dari database
        await SuratMasuk.destroy({
          where: {
            uuid: uuid,
          },
        });
        // response berhasil
        res.status(200).json({
          message: "berhasil menghapus surat",
        });
      }
    } catch (err) {
      // jika gagal menghapus data surat

      // response server error
      res.status(500).json({
        code: 500,
        status: "Terjadi kesalahan pada server",
        message: err,
      });
    }
  },
};
