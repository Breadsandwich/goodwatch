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
    const columnMapping = {
      through: 'Watchlist',
      otherKey: 'showId',
      foreignKey: 'userId'
     }


    User.belongsToMany(models.Show, columnMapping);
    // User.hasMany(models.Review, { foreignKey: 'reviewId'})


  };
  return User;
};
