'use strict';

const { rawGamesData } = require('../utils/getGamesData')
const faker = require('faker')
const db = require('../models')
const { prices } = require('../utils/constants')

const convertToIndexMap = (arr) => {
  const map = new Map()
  arr.forEach(({name, id}) => {
    map[name] = id
  })
  return map
}




module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await db.Category.findAll({
      attributes: ['id', 'name']
    });
    const publisers = await db.Publisher.findAll({
      attributes: ['id', 'name']
    });

    const PLATFORM_LENGTH = (await db.Platform.findAndCountAll()).count;

    const categoriesMap = convertToIndexMap(categories.map(cat => cat.dataValues))
    const publishersMap = convertToIndexMap(publisers.map(pub => pub.dataValues))
    const games = rawGamesData.map(gameData => {
      var CategoryId = Math.floor(Math.random()*categoriesMap.size) + 1
      if(gameData.Genre){
        CategoryId = categoriesMap[gameData.Genre.split(',')[0]]
      }
      var PublisherId = Math.floor(Math.random()*publishersMap.size) + 1
      if(gameData.Publisher){
        PublisherId = publishersMap[gameData.Publisher]
      }
      
      return {
        title: gameData.Title,
        description: faker.lorem.paragraph(),
        // math random's is 0 inclusive, 1 exclusive, adding 5.1 to assure a 5 
        releaseYear: Math.min(2021, 2000 + Math.floor(Math.random() * 21.2)),
        rating: Math.min(5, Math.random() * 5.1),
        price: prices[Math.floor(Math.random() * prices.length)],
        discount: Math.min(100, Math.random() * 100.5),
        PlatformId: Math.floor(Math.random() * PLATFORM_LENGTH) + 1,
        CategoryId,
        PublisherId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    await queryInterface.bulkInsert('Games', games, {})
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Games', null, {});
  }
};
