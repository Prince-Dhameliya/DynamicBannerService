const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

// Define Banner model
const Banner = sequelize.define('Banner', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVisible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

// Sync models with the database
sequelize.sync({ alter: true })
  .then(() => console.log('Banner Model synchronized...'))
  .catch(err => console.log('Error synchronizing Banner model: ' + err));

module.exports = Banner;
