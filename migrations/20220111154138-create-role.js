"use strict";

const { UserPermissions, AdminPermissions } = require("../utils/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      permissions: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.bulkInsert("Roles", [
      {
        id: 0,
        name: "user",
        permissions: Object.keys(UserPermissions).join(","),
      },
      {
        id: 1,
        name: "admin",
        permissions: Object.keys(AdminPermissions).join(","),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Roles");
  },
};
