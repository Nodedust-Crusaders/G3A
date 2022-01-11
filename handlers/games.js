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

const editGame = async (gameId, newGameData) => {

  try {
    let gameData = await db.Game.findByPk(gameId);

    if (!gameData) {
      return {
        message: "Game with id " + gameId + " does not exist. Nothing to edit."
      }
    }
    // apparently you can do this in JS
    for (var prop in newGameData) {
      if (newGameData[prop]) { // null here means we don't edit the field.
        gameData[prop] = newGameData[prop]
      }
    }
    res = await gameData.save(); // this updates the db.
    return {
      obiect: res.toString(),
      message: "Succsess:",

    }

  } catch (err) {
    console.log("Error @handlers/editGame:", err);
    return {
      message: err,
      obj:null
    }
  }
}

const createGame = async (gameData) => {
  try {
    if (gameData.PlatformId) {
      const platform = await db.findByPk(gameData.PlatformId);
      if (!platform) {
        return {
          message: "Error: Invalid platform id"
        }
      }
    }
    if (gameData.CategoryId) {
      const category = await db.findByPk(gameData.CategoryId);
      if (!category) {
        return {
          message: "Error: invalid category id"
        }
      }
    }
    if (gameData.PlatformId) {
      const publisher = await db.findByPk(gameData.PublisherId);
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
module.exports = { getGames, getGame, createGame, removeGame, editGame };
