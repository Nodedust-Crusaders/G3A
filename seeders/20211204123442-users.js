'use strict';
const faker = require('faker')
const db = require('../models')
const {NUMBER_OF_USERS} = require('../utils/constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = []
    for(let i = 0; i < NUMBER_OF_USERS; i++) {
      const newUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      console.log(newUser)
      users.push(newUser)
    }
    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
