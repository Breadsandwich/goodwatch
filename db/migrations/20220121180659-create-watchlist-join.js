'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WatchlistJoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      watchlistId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences: { model: 'Watchlists' }
      },
      showId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences: { model: 'Shows' }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WatchlistJoins');
  }
};
