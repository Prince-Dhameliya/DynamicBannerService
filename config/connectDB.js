const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize(process.env.DATABASE_URI,
  {
    dialect: 'mysql', // Use 'mysql2' dialect, handled by Sequelize,
  }
);

module.exports = { sequelize };