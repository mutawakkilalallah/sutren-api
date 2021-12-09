"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("disposisi", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_surat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keamanan: {
        type: Sequelize.ENUM,
        values: ["Rahasia", "Penting", "Rutin/Biasa"],
        allowNull: false,
      },
      catatan_sekretaris: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      catatan_kepala: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      catatan_pengasuh: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Proses", "Selesai"],
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("disposisi");
  },
};
