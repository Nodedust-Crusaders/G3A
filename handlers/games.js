const db = require("../models");

// get all games. only admins should be able to do this
const getGames = async () => {
  try {
    const games = await db.Game.findAll();
    return games;
  } catch (err) {
    console.log("Error @handlers/getGames: ", err);
    return null;
  }
};

// return only the games that are available for purchase.
const getAvailableGames = async () => {
  try {
    const games = await db.Game.findAll({
      where: {
        isAvailable: true,
      },
    });
    return games;
  } catch (err) {
    console.log("Error @handlers/getAvailableGames: ", err);
    return null;
  }
};

const getFilteredGames = async (CategoryId, PlatformId, PublisherId, showUnavailable) => {
  try {

    let queryObject = {};
    if (CategoryId) {
      queryObject.CategoryId = CategoryId;
    } else
    if (PlatformId) {
      queryObject.PlatformId = PlatformId;
    }
    if (PublisherId) {
      queryObject.PublisherId = PublisherId;
    }

    if (!showUnavailable) {
      queryObject.isAvailable = true;
    }
    const games = await db.Game.findAll({
      where: queryObject
    });
    return games;
  } catch (err) {
    console.log("Error @handlers/getFilteredGames: ", err);
    return null;
  }
}

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
        message: "Game with id " + gameId + " does not exist. Nothing to edit.",
      };
    }
    // apparently you can do this in JS
    for (var prop in newGameData) {
      if (newGameData[prop]) {
        // null here means we don't edit the field.
        gameData[prop] = newGameData[prop];
      }
    }
    res = await gameData.save(); // this updates the db.
    return {
      obiect: res.toString(),
      message: "Success",
    }
  } catch (err) {
    console.log("Error @handlers/editGame:", err);
    return {
      message: err,
      obj: null,
    };
  }
};

const createGame = async (gameData) => {
  try {
    if (gameData.PlatformId) {
      const platform = await db.Platform.findByPk(gameData.PlatformId);
      if (!platform) {
        return {
          message: "Error: Invalid platform id",
        };
      }
    }
    if (gameData.CategoryId) {
      const category = await db.Category.findByPk(gameData.CategoryId);
      console.log("psst",category)
      if (!category) {
        return {
          message: "Error: invalid category id",
        };
      }
    }
    if (gameData.PublisherId) {
      const publisher = await db.Publisher.findByPk(gameData.PublisherId);
      if (!publisher) {
        return {
          message: "Error: invalid publisher id",
        };
      }
    }
    const newGame = await db.Game.create(gameData);
    return {
      message: "Success",
    };
  } catch (err) {
    console.log("Error @handlers/createGame:", err);
    return err;
  }
};

const destroyGame = async (id) => {
  try {
    const game = await db.Game.findByPk(id);
    if (!game) {
      return {
        message: "Game does not exist",
      };
    }
    res = await db.Game.destroy({
      where: {
        id: game.id,
      },
    });

    return {
      message: "Success",
    };
  } catch (err) {
    console.log("Error @handlers/removeGame:", err);
    return null;
  }
};

const setGameVisibility = async (id, status) => {
  try {
    const game = await db.Game.findByPk(id);
    if (!game) {
      return {
        message: "Game does not exist",
      };
    }
    game.isAvailable = status;
    const res = await game.save();
    return {
      message: "Success",
    };
  } catch (err) {
    console.log("Error @handlers/removeGame:", err);
    return null;
  }

};
module.exports = {
  getGames,
  getAvailableGames,
  getGame,
  createGame,
  destroyGame,
  editGame,
  setGameVisibility,
};
