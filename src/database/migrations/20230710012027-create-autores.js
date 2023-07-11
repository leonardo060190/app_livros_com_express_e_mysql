'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('autores', {
    id: {
      allowNull: false,
        autoIncrement: true,
          primaryKey: true,
            type: Sequelize.INTEGER
    },
    nome: {
      type: Sequelize.STRING(80),
        allowNull: false
    },
    sobrenome: {
      type: Sequelize.STRING(60),
        allowNull: false
    },
    data_nascimento: {
      type: Sequelize.DATE,
        allowNull: false
    },
    sexo: {
      type: Sequelize.STRING(1),
        allowNull: false
    },
    telefone: {
      type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
      type: Sequelize.STRING(350),
        allowNull: true
    },
    foto: {
      type: Sequelize.STRING,
        allowNull: true
    }
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('autores');
  }
};
