const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        uuid: uuidv4(),
        nama: "Sysadmin",
        username: "sysadmin",
        password: await bcrypt.hash("sysadmin", 10),
        akses: "System Administrator",
        picture: "/upload/pictures/programmer.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        nama: "Admin",
        username: "adminadmin",
        password: await bcrypt.hash("adminadmin", 10),
        akses: "Admin",
        picture: "/upload/pictures/programmer.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        nama: "Supervisor",
        username: "supervisor",
        password: await bcrypt.hash("supervisor", 10),
        akses: "Supervisor",
        picture: "/upload/pictures/programmer.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
