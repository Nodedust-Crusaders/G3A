'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Game.belongsTo(models.Publisher, {
        foreignKey: 'publisherId'
      })
      models.Game.belongsTo(models.Currency, {
        foreignKey: 'currencyId'
      })
      models.Game.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
      models.Game.belongsTo(models.Platform, {
        foreignKey: 'platformId'
      })

      models.Game.belongsToMany(models.User, {
        through: 'Review'
      })
      models.Game.hasMany(models.Review)

      models.Game.belongsToMany(models.User, {
        through: 'Purchase'
      })
      models.Game.hasMany(models.Purchase)
    }
  };
  Game.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    currencyId: DataTypes.INTEGER,
    platformId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    publisherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};