'use strict';
const axios = require('axios')

const CURRENCIES_URL = 'https://raw.githubusercontent.com/mhs/world-currencies/master/currencies.json'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await axios.get(CURRENCIES_URL)
    .then(res => res.data)
    .then( async enhancedCurrencies => {
      const currencies = enhancedCurrencies.map(ec => ({
        name: ec.name,
        code: ec.cc,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      await queryInterface.bulkInsert('Currencies', currencies, {})
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Currencies', null, {});
  }
};
