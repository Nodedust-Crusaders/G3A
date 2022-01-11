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
        foreignKey: 'PublisherId'
      })
      models.Game.belongsTo(models.Currency, {
        foreignKey: 'CurrencyId'
      })
      models.Game.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })
      models.Game.belongsTo(models.Platform, {
        foreignKey: 'PlatformId'
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
    isAvailable: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    CurrencyId: DataTypes.INTEGER,
    PlatformId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    PublisherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};