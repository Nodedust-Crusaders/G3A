'use strict';
const {NUMBER_OF_REVIEWS, NUMBER_OF_USERS } = require('../utils/constants')
const {gamesNames} = require('../utils/getGamesData')
const faker = require('faker')

const NUMBER_OF_GAMES = gamesNames.length

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reviews = []
    for(let i = 0; i< NUMBER_OF_REVIEWS; i++) {
      reviews.push({
        userId: Math.min(NUMBER_OF_USERS, 1 + Math.floor(Math.random() * (NUMBER_OF_USERS + 0.2))),
        gameId: Math.min(NUMBER_OF_GAMES, 1 + Math.floor(Math.random() * (NUMBER_OF_GAMES + 0.2))),
        comment: faker.lorem.sentence(),
        rating: Math.min(5, Math.random() * 5.1),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
