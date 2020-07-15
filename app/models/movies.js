'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model { };
  movies.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    type: DataTypes.STRING,
    imdb: DataTypes.STRING,
    tmdb: DataTypes.STRING,
    image: DataTypes.STRING,
    purchasedby: DataTypes.STRING,
    purchasedtill: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'movies',
    timeStamp: false,
    createdAt: false,
    updatedAt: false,
  });
  movies.sync({ alter: true });
  return movies;
};