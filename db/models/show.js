'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define('Show', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    overallRating: DataTypes.NUMERIC,
    watchStatus: DataTypes.BOOLEAN,

    genre: DataTypes.STRING,
    imageSrc: DataTypes.STRING
  }, {});
  Show.associate = function(models) {
    // associations can be defined here

    Show.hasMany(models.Review, { foreignKey: 'showId' });

  };
  return Show;
};
