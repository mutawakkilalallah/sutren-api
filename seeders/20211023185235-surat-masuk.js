const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 1; i < 16; i++) {
      await queryInterface.bulkInsert("surat_masuk", [
        {
          uuid: uuidv4(),
          nomer_urut: i,
          nomer_agenda: i,
          kode_arsip: "A.VII",
          tanggal_terima: new Date("2021-10-25"),
          tanggal_surat: new Date("2021-10-22"),
          asal: "Forum Komunikasi Santri Madura",
          alamat: "Pamekasan, Jawa Timur",
          nomer_surat: `NJ-H/FKS.18/0${i}/10.2021`,
          tujuan: "Kepala Pondok Pesantren",
          perihal: "Permohonan Rekomendasi",
          keterangan: "Kegiatan Libur Ramadhan 1444 H",
          document: "/upload/documents/sample-pdf-document.pdf",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("surat_masuk", null, {});
  },
};
