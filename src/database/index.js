const Sequelize = require('sequelize');//importa a biblioteca do sequelize
const dbConfig = require('../config/database');//importa a biblioteca do db config


const Livros = require('../models/Livros');
const Autores = require('../models/Autores');
const Editoras = require('../models/Editoras');

const connection = new Sequelize(dbConfig);//da o start no sequelize com o db config

Livros.init(connection);
Autores.init(connection);
Editoras.init(connection);

module.exports = connection;//exporta para toda aplicação