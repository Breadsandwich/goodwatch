'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {});
  Watchlist.associate = function(models) {
    // associations can be defined here
  };
  return Watchlist;
};
