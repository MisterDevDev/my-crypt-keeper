const Sequelize = require('sequelize')
const db = require('../db')
const { DataTypes: {STRING, UUID, UUIDV4, BOOLEAN } } = Sequelize;

const User = db.define('user', {
    username: {
      type: STRING,
      unique: true,
      allowNull: false,
    }
  })

  module.exports = User