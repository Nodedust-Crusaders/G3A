'use strict';

const { rawGamesData, gamesNames, gamesCategories, gamesPublishers } = require('../utils/getGamesData')
const { platforms, prices } = require('../utils/constants')
const faker = require('faker')

const convertToIndexMap = (arr) => {
  const map = new Map()
  arr.forEach((el, index) => {
    map[el] = index + 1
  })
  return map
}

const CURRENCY_LENGTH = 156 // from db
const PLATFORM_LENGTH = platforms.length


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesMap = convertToIndexMap(gamesCategories)
    const publishersMap = convertToIndexMap(gamesPublishers)

    const games = gamesNames.map(gn => {
      const rawData = rawGamesData.find(rg => rg.Title === gn)
      var CategoryId = Math.floor(Math.random()*categoriesMap.size) + 1
      if(rawData.Genre){
        CategoryId = categoriesMap[rawData.Genre.split(',')[0]]
      }
      var PublisherId = Math.floor(Math.random()*publishersMap.size) + 1
      if(rawData.Publisher){
        PublisherId = publishersMap[rawData.Publisher]
      }
      
      return {
        title: rawData.Title,
        isAvailable: (Math.random() > 0.5) ? true : false,
        description: faker.lorem.paragraph(),
        // math random's is 0 inclusive, 1 exclusive, adding 5.1 to assure a 5 
        releaseYear: Math.min(2021, 2000 + Math.floor(Math.random() * 21.2)),
        rating: Math.min(5, Math.random() * 5.1),
        price: prices[Math.floor(Math.random() * prices.length)],
        discount: Math.min(100, Math.random() * 100.5),
        CurrencyId: Math.floor(Math.random() * CURRENCY_LENGTH) + 1,
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
