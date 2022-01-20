'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {});
  Watchlist.associate = function(models) {
    Watchlist.belongsTo(models.User, { foreignKey: 'userId'})
    Watchlist.belongsTo(models.Show, { foreignKey: 'showId'})
  };
  return Watchlist;
};
