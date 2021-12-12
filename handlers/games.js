const db = require("../models");

const getGames = async () => {
  try {
    const games = await db.Game.findAll();
    return games;
  } catch (err) {
    console.log("Error @handlers/getGames: ", err);
    return null;
  }
};

const getGame = async (id) => {
  try {
    const game = await db.Game.findByPk(id);
    return game;
  } catch (err) {
    console.log("Error @handlers/getGame: ", err);
    return null;
  }
};

module.exports = { getGames, getGame };
