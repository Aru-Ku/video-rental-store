'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model { };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    bonuspoints: DataTypes.INTEGER,
    cart: DataTypes.ARRAY(DataTypes.BIGINT),
    purchased: DataTypes.ARRAY(DataTypes.BIGINT)
  }, {
    sequelize,
    modelName: 'users',
    timeStamp: false,
    createdAt: false,
    updatedAt: false,
  });
  users.sync({ alter: true });
  return users;
};