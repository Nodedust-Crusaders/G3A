'use strict';

const { gamesCategories } = require('../utils/getGamesData')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = gamesCategories.map(gc => ({
      name: gc,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await queryInterface.bulkInsert('Categories', categories, {})
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
