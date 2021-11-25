module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define(
    "test",
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
      tableName: "test",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return test;
};
