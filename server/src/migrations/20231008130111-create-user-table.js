'use strict';
const { DataType } = require("sequelize-typescript");

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      cognito_id: {
        type: DataType.STRING
      },
      token: {
        type: DataType.STRING
      }
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users');
  }
};