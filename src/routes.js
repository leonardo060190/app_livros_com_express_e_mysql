const express = require('express');
const LivrosController = require('./controller/LivrosController');
const AutoresController = require('./controller/AutoresController');
const EditorasController = require('./controller/EditorasController');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Olá leonardo')
});

////////////////////////////////////////////////////////////////

// Rotas da tabela livros
routes.get('/livros', LivrosController.index)
routes.get('/livros/:titulo', LivrosController.findByid)
routes.post('/livros', LivrosController.store)
routes.delete('/livros/:id', LivrosController.delete)
routes.put('/livros/:id', LivrosController.update)
//routes.get('/livros/resumoLivros', LivrosController.resumoLivros)
routes.get('/livros/dados/grafico', LivrosController.dadosGrafico)

////////////////////////////////////////////////////////////////

//Rotas da tabela autores
routes.get('/autores', AutoresController.index)
routes.get('/autores/:nome', AutoresController.findByid)
routes.post('/autores', AutoresController.store)
routes.delete('/autores/:id', AutoresController.delete)
routes.put('/autores/:id', AutoresController.update)


////////////////////////////////////////////////////////////////

//Rotas da tabela editoras
routes.get('/editoras', EditorasController.index)  
routes.get('/editoras/:nome', EditorasController.findByid)
routes.post('/editoras', EditorasController.store)
routes.delete('/editoras/:id', EditorasController.delete)
routes.put('/editoras/:id', EditorasController.update)


////////////////////////////////////////////////////////////////


module.exports = routes;