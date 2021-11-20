module.exports = (sequelize, DataTypes) => {
  const pengesahan = sequelize.define(
    "pengesahan",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      jabatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "pengesahan",
      timestamps: false,
    }
  );
  return pengesahan;
};
