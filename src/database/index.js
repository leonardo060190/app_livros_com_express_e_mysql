const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const Livros = require('../models/Livros');
const Autores = require('../models/Autores');
const Editoras = require('../models/Editoras');

const connection = new Sequelize(dbConfig);

Livros.init(connection);
Autores.init(connection);
Editoras.init(connection);

module.exports = connection;