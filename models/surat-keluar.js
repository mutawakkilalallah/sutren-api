const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const surat_keluar = sequelize.define(
    "surat_keluar",
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
      id_jenis: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
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
  return surat_keluar;
};
