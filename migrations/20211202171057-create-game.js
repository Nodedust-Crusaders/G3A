'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      releaseYear: {
        type: Sequelize.DATE
      },
      rating: {
        type: Sequelize.DOUBLE
      },
      price: {
        type: Sequelize.DOUBLE
      },
      discount: {
        type: Sequelize.DOUBLE
      },
      currencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Currencies'
          },
          key: 'id',
        },
      },
      platformId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Platforms'
          },
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id',
        },
      },
      publisherId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Publishers'
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  }
};