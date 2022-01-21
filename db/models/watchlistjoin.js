'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistJoin = sequelize.define('WatchlistJoin', {
    watchlistId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER,
    showName: DataTypes.STRING
  }, {});
  WatchlistJoin.associate = function(models) {
    // associations can be defined here
  };
  return WatchlistJoin;
};