"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tujuan",
      [
        {
          nama: "Kepala Pesantren",
          type: "Jabatan",
        },
        {
          nama: "Sekretaris Pesantren",
          type: "Jabatan",
        },
        {
          nama: "Bendahara Pesantren",
          type: "Jabatan",
        },
        {
          nama: "Biro Pengembangan",
          type: "Lembaga",
        },
        {
          nama: "Biro Kepesantrenan",
          type: "Lembaga",
        },
        {
          nama: "Biro Pendidikan",
          type: "Lembaga",
        },
        {
          nama: "KH. Abd. Hamid Wahid, M,Ag.",
          type: "Person",
        },
        {
          nama: "H. Faizin Syamwil, M.Pd.",
          type: "Person",
        },
        {
          nama: "K. Ahmad Zaki",
          type: "Person",
        },
        {
          nama: "PP. Sidogiri Pasuruan",
          type: "Eksternal",
        },
        {
          nama: "PP. Salafiyah Sukerejo",
          type: "Eksternal",
        },
        {
          nama: "PP. Nurul Islam Jember",
          type: "Eksternal",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tujuan", null, {});
  },
};
