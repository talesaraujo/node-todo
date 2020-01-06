'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      created_at: {
        type: Sequelize.STRING,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.STRING,
        allowNull: false
      }
      
    });
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('users');
  }
};
