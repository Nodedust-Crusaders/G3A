"use strict";
const { NUMBER_OF_REVIEWS, NUMBER_OF_USERS } = require("../utils/constants");
const { gamesNames, getRand } = require("../utils/getGamesData");
const faker = require("faker");

const NUMBER_OF_GAMES = gamesNames.length;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reviews = [];
    for (let i = 0; i < NUMBER_OF_REVIEWS; i++) {
      let UserId = getRand(NUMBER_OF_USERS);
      let GameId = getRand(NUMBER_OF_GAMES);
      while(reviews.filter(pur => pur.GameId === GameId && pur.UserId === UserId).length > 0){
        UserId = getRand(NUMBER_OF_USERS);
        GameId = getRand(NUMBER_OF_GAMES);
      }
      reviews.push({
        UserId,
        GameId,
        comment: faker.lorem.sentence(),
        rating: Math.min(5, Math.random() * 5.1),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Reviews", reviews, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
