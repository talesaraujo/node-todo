const Sequelize = require('sequelize');
const dbConfig = require('./config');

const User = require('../models/User');
const Todo = require('../models/Todo');


const connection = new Sequelize(dbConfig);

User.init(connection);
Todo.init(connection);

User.associate(connection.models);
Todo.associate(connection.models);


module.exports = connection;