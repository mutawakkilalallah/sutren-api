"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pengesahan",
      [
        {
          jabatan: "Kepala Pesantren",
          nama: "KH. Abd. Hamid Wahid",
          niup: 31820500002,
        },
        {
          jabatan: "Sekretaris Pesantren",
          nama: "H. Faizin Syamwil, M.Pd.",
          niup: 31820500078,
        },
        {
          jabatan: "Bendahara Pesantren",
          nama: "K. Ahmad Zaki",
          niup: 31820701748,
        },
        {
          jabatan: "Kepala Biro Kepesantrenan",
          nama: "KH. Fahmi Ahz",
          niup: 31820901773,
        },
        {
          jabatan: "Kepala Biro Pengembangan",
          nama: "KH. Faiz",
          niup: 31820101775,
        },
        {
          jabatan: "Kepala Biro Umum",
          nama: "Abdurrohman Wafie",
          niup: 31820501782,
        },
        {
          jabatan: "Kepala Bidang Tarbiyah Wat Ta'lim",
          nama: "Misbahul Munir, M.Pd.I.",
          niup: 59819509784,
        },
        {
          jabatan: "Kepala Bidang Pengembangan Pondok dan Masyarakat (PPM)",
          nama: "Rojabi Azharghany",
          niup: 31820108256,
        },
        {
          jabatan: "Kepala Bidang Kesenian dan Olahraga Santri (BKOS)",
          nama: "KH. Muhammad Maimun",
          niup: 31820101767,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pengesahan", null, {});
  },
};
