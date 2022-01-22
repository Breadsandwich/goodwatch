'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    showId: {
      type: DataTypes.INTEGER,
      references: { model: 'Shows' }
    }
  }, {});
  Watchlist.associate = function(models) {
    const columnMapping = {
      through: 'WatchlistJoin',
      otherkey: 'showId',
      foreignKey: 'watchlistId'

    }

    Watchlist.belongsToMany(models.Show, columnMapping)
    Watchlist.belongsTo(models.User, { foreignKey: 'userId'})

  };
  return Watchlist;
};
