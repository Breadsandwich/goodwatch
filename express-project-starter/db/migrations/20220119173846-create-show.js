'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      overallRating: {
        type: Sequelize.NUMERIC(3, 2)
      },
      watchStatus: {
        type: Sequelize.STRING
      },
      genre: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Shows');
  }
};