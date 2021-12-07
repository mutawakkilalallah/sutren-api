module.exports = (sequelize, DataTypes) => {
  const jenis = sequelize.define(
    "jenis",
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
      tableName: "jenis",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return jenis;
};
