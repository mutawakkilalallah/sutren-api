"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tujuan",
      [
        {
          nama: "Kepala Pesantren",
        },
        {
          nama: "Sekretaris Pesantren",
        },
        {
          nama: "Bendahara Pesantren",
        },
        {
          nama: "Biro Kepesantrenan",
        },
        {
          nama: "Biro Pengembangan",
        },
        {
          nama: "Biro Umum",
        },
        {
          nama: "Bidang Tarbiyah Wat Ta'lim",
        },
        {
          nama: "Bidang Pengembangan Pondok dan Masyarakat (PPM)",
        },
        {
          nama: "Bidang Kesenian dan Olahraga Santri (BKOS)",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tujuan", null, {});
  },
};
