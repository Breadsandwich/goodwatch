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
  };
  return Show;
};