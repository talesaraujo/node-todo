const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

// Import models

const connection = new Sequelize(dbConfig);

// Initialize models
// Associate models

module.exports = connection;