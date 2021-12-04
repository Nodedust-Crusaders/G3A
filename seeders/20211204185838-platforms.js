'use strict';

const { platforms } = require('../utils/constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const enhancedPlatforms = platforms.map(p => ({
      name: p,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await queryInterface.bulkInsert('Platforms', enhancedPlatforms, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Platforms', null, {});
  }
};
