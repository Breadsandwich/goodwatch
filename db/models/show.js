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
    const watchlistColumnMapping = {
      through: 'Watchlist',
      otherKey: 'userId',
      foreignKey: 'showId'
     }

     const reviewColumnMapping = {
      through: 'Review',
      otherKey: 'showId',
      foreignKey: 'userId'
     }

    Show.belongsToMany(models.User, watchlistColumnMapping)
    // Show.belongsToMany(models.User, reviewColumnMapping);
    Show.hasMany(models.Review, { foreignKey: 'showId' });
    Show.hasMany(models.Watchlist, { foreignKey: 'showId' })

  };
  return Show;
};
