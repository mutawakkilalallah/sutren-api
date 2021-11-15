module.exports = (sequelize, DataTypes) => {
  const TujuanSurat = sequelize.define(
    "TujuanSurat",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      uuid_surat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jabatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      niup: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "tujuan_surat",
      timestamps: false,
    }
  );
  return TujuanSurat;
};
