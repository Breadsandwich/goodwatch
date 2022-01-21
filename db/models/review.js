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
    // TODO: reviewCollumnMapping

    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Show, { foreignKey: 'showId' })
    // Review.hasMany(models.User, { foreignKey: 'reviewId' })
  };
  return Review;
};
