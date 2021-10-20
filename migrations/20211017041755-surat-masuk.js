"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("surat_masuk", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nomer_urut: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nomer_agenda: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kode_arsip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal_terima: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggal_surat: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nomer_surat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tujuan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      perihal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keterangan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      document: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("surat_masuk");
  },
};
