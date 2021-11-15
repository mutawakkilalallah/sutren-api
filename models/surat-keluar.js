const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const SuratKeluar = sequelize.define(
    "SuratKeluar",
    {
      uuid: {
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nomer_surat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lampiran: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      perihal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tanggal_surat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // document: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      createdAt: {
        field: "createdAt",
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedAt: {
        field: "updatedAt",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "surat_keluar",
      timestamp: true,
    }
  );
  return SuratKeluar;
};
