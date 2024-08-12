const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

// Define Banner model
const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync models with the database
sequelize.sync({ alter: true })
  .then(() => console.log('Users Model synchronized...'))
  .catch(err => console.log('Error synchronizing Users model: ' + err));

module.exports = Users;
