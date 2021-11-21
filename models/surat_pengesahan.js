module.exports = (sequelize, DataTypes) => {
  const surat_pengesahan = sequelize.define(
    "surat_pengesahan",
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
      id_pengesahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "surat_pengesahan",
      timestamps: false,
    }
  );
  return surat_pengesahan;
};
