"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Purchase.belongsTo(models.Game);
      models.Purchase.belongsTo(models.User);
    }
  }
  Purchase.init(
    {
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
