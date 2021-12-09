module.exports = (sequelize, DataTypes) => {
  const disposisi = sequelize.define(
    "disposisi",
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
      keamanan: {
        type: DataTypes.ENUM,
        values: ["Rahasia", "Penting", "Rutin/Biasa"],
        allowNull: false,
      },
      catatan_sekretaris: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      catatan_kepala: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      catatan_pengasuh: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Proses", "Selesai"],
        allowNull: false,
      },
    },
    {
      tableName: "disposisi",
      timestamps: false,
    }
  );
  return disposisi;
};
