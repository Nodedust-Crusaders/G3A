"use strict";
const { gamesNames, getRand } = require("../utils/getGamesData");

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
      let UserId = getRand(NUMBER_OF_USERS);
      let GameId = getRand(NUMBER_OF_GAMES);
      while(purchases.filter(pur => pur.GameId === GameId && pur.UserId === UserId).length > 0){
        UserId = getRand(NUMBER_OF_USERS);
        GameId = getRand(NUMBER_OF_GAMES);
      }
      purchases.push({
        UserId,
        GameId,
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
