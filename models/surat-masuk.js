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
        type: DataTypes.STRING,
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
      id_document: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      tableName: "surat_masuk",
      timestamp: true,
    }
  );
  return SuratMasuk;
};
