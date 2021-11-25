"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pengesahan",
      [
        {
          jabatan: "Kepala Pesantren",
          nama: "KH. Abd. Hamid Wahid",
          niup: 20500002,
        },
        {
          jabatan: "Sekretaris Pesantren",
          nama: "H. Faizin Syamwil, M.Pd.",
          niup: 20500078,
        },
        {
          jabatan: "Bendahara Pesantren",
          nama: "K. Ahmad Zaki",
          niup: 20701748,
        },
        {
          jabatan: "Kepala Biro Kepesantrenan",
          nama: "KH. Fahmi Ahz",
          niup: 20901773,
        },
        {
          jabatan: "Kepala Biro Pengembangan",
          nama: "KH. Faiz",
          niup: 20101775,
        },
        {
          jabatan: "Kepala Biro Umum",
          nama: "Abdurrohman Wafie",
          niup: 20501782,
        },
        {
          jabatan: "Kepala Bidang Tarbiyah Wat Ta'lim",
          nama: "Misbahul Munir, M.Pd.I.",
          niup: 19509784,
        },
        {
          jabatan: "Kepala Bidang Pengembangan Pondok dan Masyarakat (PPM)",
          nama: "Rojabi Azharghany",
          niup: 20108256,
        },
        {
          jabatan: "Kepala Bidang Kesenian dan Olahraga Santri (BKOS)",
          nama: "KH. Muhammad Maimun",
          niup: 20101767,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pengesahan", null, {});
  },
};
