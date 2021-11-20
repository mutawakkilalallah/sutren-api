module.exports = (sequelize, DataTypes) => {
  const tujuan = sequelize.define(
    "tujuan",
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
    },
    {
      tableName: "tujuan",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return tujuan;
};
