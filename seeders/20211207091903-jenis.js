"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "jenis",
      [
        {
          nama: "Berita Acara",
        },
        {
          nama: "Intruksi",
        },
        {
          nama: "Keputusan",
        },
        {
          nama: "Memo",
        },
        {
          nama: "Nota Dinas",
        },
        {
          nama: "Nota Kesepahaman",
        },
        {
          nama: "Pengumuman",
        },
        {
          nama: "Peraturan",
        },
        {
          nama: "Perjanjian Kerjasama",
        },
        {
          nama: "Surat Dinas",
        },
        {
          nama: "Surat Keterangan",
        },
        {
          nama: "Surat Kuasa",
        },
        {
          nama: "Surat Pengantar",
        },
        {
          nama: "Surat Perintah",
        },
        {
          nama: "Surat Pernyataan",
        },
        {
          nama: "Surat Tugas",
        },
        {
          nama: "Surat Undangan",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("jenis", null, {});
  },
};
