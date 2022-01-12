const db = require("../models");

const getPurchases = async () => {
  try {
    const purchases = await db.Purchase.findAll();
    return purchases;
  } catch (err) {
    console.log("Error @handlers/getPurchases:", err);
    return null;
  }
};

const getUserPurchasesWithId = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    const purchases = await user.getPurchases();
    return purchases;
  } catch (err) {
    console.log("Error @handlers/getUserPurchasesWithId:", err);
    return null;
  }
};

const addPurchaseHandler = async (userId, gameId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    const game = await db.Game.findOne({
      where: {
        id: gameId,
      },
    });

    if (!user) {
      return {
        message: "User does not exist",
      };
    }

    if (!game) {
      return {
        message: "Game does not exist",
      };
    }

    if (game.isAvailable === false) {
      return {
        message: "Game currently unavailable for purchase",
      };
    }
    const newPurchase = await db.Purchase.create({
      UserId: userId,
      GameId: gameId,
      price: game.price,
    });

    return newPurchase;
  } catch (err) {
    console.error("Error @addPurchaseHandler:", err);
    return { message: err.message };
  }
};

const removePurchaseHandler = async (userId, gameId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    const game = await db.Game.findOne({
      where: {
        id: gameId,
      },
    });

    if (!user) {
      return {
        message: "User does not exist",
      };
    }

    if (!game) {
      return {
        message: "Game does not exist",
      };
    }

    const toBeDeleted = await db.Purchase.findOne({
      where: {
        UserId: userId,
        GameId: gameId,
      },
    });
    if (!toBeDeleted) {
      return {
        message: "Purchase does not exist",
      };
    }

    res = db.Purchase.destroy({
      where: {
        userId: toBeDeleted.userId,
        gameId: toBeDeleted.gameId,
      },
    });

    return {
      message: "Success",
    };
  } catch (err) {
    console.error("Error @removeReviewHandler:", err);
    return { message: err.message };
  }
};
module.exports = {
  getPurchases,
  getUserPurchasesWithId,
  addPurchaseHandler,
  removePurchaseHandler,
};
