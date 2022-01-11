"use strict";
const { gamesNames } = require("../utils/getGamesData");

const {
  NUMBER_OF_USERS,
  NUMBER_OF_PURCHASES,
  prices,
} = require("../utils/constants");
const NUMBER_OF_GAMES = gamesNames.length;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const purchases = [];
    for (let i = 0; i < NUMBER_OF_PURCHASES; i++) {
      const price = prices[Math.floor(Math.random() * prices.length)];
      purchases.push({
        UserId: Math.min(
          NUMBER_OF_USERS,
          1 + Math.floor(Math.random() * (NUMBER_OF_USERS + 0.2))
        ),
        GameId: Math.min(
          NUMBER_OF_GAMES,
          1 + Math.floor(Math.random() * (NUMBER_OF_GAMES + 0.2))
        ),
        price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Purchases", purchases, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Purchases", null, {});
  },
};
