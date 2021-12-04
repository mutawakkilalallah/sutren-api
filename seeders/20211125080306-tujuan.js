"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tujuan",
      [
        {
          nama: "Kepala Pesantren",
          kategori: "Staff/Jabatan",
        },
        {
          nama: "Sekretaris Pesantren",
          kategori: "Staff/Jabatan",
        },
        {
          nama: "Bendahara Pesantren",
          kategori: "Staff/Jabatan",
        },
        {
          nama: "Biro Kepesantrenan",
          kategori: "Instansi/Lembaga",
        },
        {
          nama: "Biro Pengembangan",
          kategori: "Instansi/Lembaga",
        },
        {
          nama: "Biro Umum",
          kategori: "Instansi/Lembaga",
        },
        {
          nama: "Bidang Tarbiyah Wat Ta'lim",
          kategori: "Instansi/Lembaga",
        },
        {
          nama: "Bidang Pengembangan Pondok dan Masyarakat (PPM)",
          kategori: "Instansi/Lembaga",
        },
        {
          nama: "Bidang Kesenian dan Olahraga Santri (BKOS)",
          kategori: "Instansi/Lembaga",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tujuan", null, {});
  },
};
