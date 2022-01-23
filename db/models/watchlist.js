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
    showsList: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  }, {});
  Watchlist.associate = function(models) {
    Watchlist.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Watchlist;
};
