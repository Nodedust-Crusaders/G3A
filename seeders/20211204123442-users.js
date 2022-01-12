"use strict";
const faker = require("faker");
const db = require("../models");
const bcrypt = require("bcrypt");
const { NUMBER_OF_USERS } = require("../utils/constants");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminUser = {
      username: "store.admin",
      password: await bcrypt.hash("1234", SALT_ROUNDS),
      email: "store.admin@gmail.com",
      firstName: "Store",
      lastName: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      RoleId: 1,
    };

    const users = [adminUser];

    for (let i = 0; i < NUMBER_OF_USERS; i++) {
      const newUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
        RoleId: 0,
      };
      console.log(newUser);
      users.push(newUser);
    }
    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
