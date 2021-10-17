"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("surat_masuk", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nomer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tujuan: {
        type: Sequelize.STRING,
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

    // await queryInterface.addConstraint("surat-masuk", {
    //   type: "unique",
    //   field: ["nomer"],
    //   name: "UNIQUE_NOMER_SURAT",
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("surat_masuk");
  },
};
