'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },

      desc: {
        type: Sequelize.STRING,
        allowNull: false
      },

      done: {
        type: Sequelize.INTEGER,
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
    
    return queryInterface.dropTable('todos');
    
  }
};
