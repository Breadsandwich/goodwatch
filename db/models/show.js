'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define('Show', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    overallRating: DataTypes.NUMERIC,
    watchStatus: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  Show.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Watchlist',
      otherKey: 'userId',
      foreignKey: 'showId'
     }

     const columnMapping2 = {
      through: 'WatchlistJoin',
      otherkey: 'watchlistId',
      foreignKey: 'showId'

    }

    Show.belongsToMany(models.Watchlist, columnMapping2)
    Show.hasMany(models.Review, { foreignKey: 'showId' });
    Show.belongsToMany(models.User, columnMapping)

  };
  return Show;
};
