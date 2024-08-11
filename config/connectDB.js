const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});


// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql', // Use 'mysql2' dialect, handled by Sequelize
  }
);

module.exports = { sequelize, connection };