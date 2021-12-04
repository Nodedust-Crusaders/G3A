'use strict';

const { gamesPublishers } = require('../utils/getGamesData')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const publishers = gamesPublishers.map(gp => ({
      name: gp,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await queryInterface.bulkInsert('Publishers', publishers, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Publishers', null, {});
  }
};
