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

const createGame = async (gameData) => {
  try {
    if (gameData.PlatformId) {
      const platform = db.findByPk(gameData.PlatformId);
      if (!platform) {
        return {
          message: "Error: Invalid platform id"
        }
      }
    }
    if (gameData.CategoryId) {
      const category = db.findByPk(gameData.CategoryId);
      if (!category) {
        return {
          message: "Error: invalid category id"
        }
      }
    }
    if (gameData.PlatformId) {
      const publisher = db.findByPk(gameData.PublisherId);
      if (!publisher) {
        return {
          message: "Error: invalid publisher id"
        }
      }
    }
    const newGame = await db.Game.create(gameData);
    return {
      message: "Success"
    };
  } catch (err) {
    console.log("Error @handlers/createGame:", err);
    return err;
  }
}

const removeGame = async (id) => {
  try {
    const game = await db.Game.findByPk(id);
    if (!game) {
      return {
        message: "Game does not exist"
      }
    }
    res = db.Game.destroy({
      where: {
        id: game.id
      }
    })

    return {
      message: "Success"
    }
  } catch (err) {
    console.log("Error @handlers/removeGame:", err);
    return null;
  }
}
module.exports = { getGames, getGame, createGame, removeGame };
