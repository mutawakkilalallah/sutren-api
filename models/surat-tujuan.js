module.exports = (sequelize, DataTypes) => {
  const SuratTujuan = sequelize.define(
    "surat_tujuan",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_surat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_tujuan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "surat_tujuan",
      timestamps: false,
    }
  );
  return SuratTujuan;
};
