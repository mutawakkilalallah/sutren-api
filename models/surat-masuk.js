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
      nomer: { type: DataTypes.STRING, allowNull: false },
      tujuan: { type: DataTypes.STRING, allowNull: false },
      document: { type: DataTypes.STRING, allowNull: false },
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
