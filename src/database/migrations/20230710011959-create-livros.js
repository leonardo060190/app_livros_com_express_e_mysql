'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      autor: {
        allowNull: false,
        type: Sequelize.STRING(80)
      },
      ano: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      preco: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      foto: {
        allowNull: true,
        type: Sequelize.STRING
      }

    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('livros');
  }
};
