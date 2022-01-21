'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    const watchlistColumnMapping = {
      through: 'Watchlist',
      otherKey: 'showId',
      foreignKey: 'userId'
     }
     const reviewColumnMapping = {
      through: 'Reviews',
      otherKey: 'showId',
      foreignKey: 'userId'
     }


    User.belongsToMany(models.Show, watchlistColumnMapping);
    // User.belongsToMany(models.Show, reviewColumnMapping);
    // User.hasMany(models.Review, { foreignKey: 'reviewId'})


  };
  return User;
};
