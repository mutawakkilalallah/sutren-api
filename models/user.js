const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      uuid: {
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      akses: {
        type: DataTypes.ENUM,
        values: ["sysadmin", "admin", "supervisor"],
        allowNull: false,
      },
      id_picture: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
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
      tableName: "user",
      timestamp: true,
    }
  );
  return user;
};
