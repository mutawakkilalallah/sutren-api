const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const SuratMasuk = sequelize.define(
    "SuratMasuk",
    {
      uuid: {
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nomer_urut: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nomer_agenda: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kode_arsip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_terima: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tanggal_surat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nomer_surat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tujuan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      perihal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: "createdAt",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updatedAt",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "surat_masuk",
      timestamp: true,
    }
  );
  return SuratMasuk;
};
