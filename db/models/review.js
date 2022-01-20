'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.NUMERIC
  }, {});
  Review.associate = function(models) {
    // Column mapping

    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Show, { foreignKey: 'showId' });
  };
  return Review;
};
