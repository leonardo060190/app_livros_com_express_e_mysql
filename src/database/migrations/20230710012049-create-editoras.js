'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async(queryInterface, Sequelize) => {
  await queryInterface.createTable('editoras', {
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
    telefone: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rua: {
      type: Sequelize.STRING,
      allowNull: false
    },
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cep: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bairro: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cidade: {
      type: Sequelize.STRING(80),
      allowNull: false
    },
    estado: {
      type: Sequelize.STRING(50),
      allowNull: false
    }

  })
   
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('editoras');
    
  }
};
