const express = require('express'); // importa biblioteca do express

const LivrosController = require('./controller/LivrosController');//importa pasta do LivrosController
const AutoresController = require('./controller/AutoresController');//importa pasta do AutoresController
const EditorasController = require('./controller/EditorasController');//importa pasta do EditorasController

const routes = express.Router();//importa biblioteca do routes do express router

routes.get('/', (req, res) => {
    res.send('Olá leonardo')
});

////////////////////////////////////////////////////////////////

// Rotas da tabela livros
routes.get('/livros', LivrosController.index)// rota para buscar todos os livros
routes.get('/livros/:titulo', LivrosController.findByid)// rota para buscar o livro com o id informado
routes.get('/livros/dados/grafico', LivrosController.dadosGrafico)// rota para fazer um grafico com os dados da tabela livros
routes.get('/livros/dados/resumo', LivrosController.dadosLivros)//rota para apresentar os dados da tabela livros com count,sum,max,avg.
routes.post('/livros', LivrosController.store)// rota para inserir livros na tabela livros
routes.delete('/livros/:id', LivrosController.delete)// rota para excluir o livro com o id informado
routes.put('/livros/:id', LivrosController.update)// rota para alterar um dados espacifico de um livro pelo id que foi informado


////////////////////////////////////////////////////////////////

//Rotas da tabela autores
routes.get('/autores', AutoresController.index)// rota para buscar todos os autores
routes.get('/autores/:nome', AutoresController.findByid)// rota para buscar o autor com o id informado
routes.post('/autores', AutoresController.store)// rota para inserir autores na tabela autores
routes.delete('/autores/:id', AutoresController.delete)// rota para excluir o autor com o id informado
routes.put('/autores/:id', AutoresController.update)// rota para alterar um dados espacifico de um autor pelo id que foi informado


////////////////////////////////////////////////////////////////

//Rotas da tabela editoras
routes.get('/editoras', EditorasController.index)// rota para buscar todos os editoras  
routes.get('/editoras/:nome', EditorasController.findByid)// rota para buscar uma editora com o id informado
routes.post('/editoras', EditorasController.store)// rota para inserir editoras na tabela editoras
routes.delete('/editoras/:id', EditorasController.delete)// rota para excluir o editora com o id informado
routes.put('/editoras/:id', EditorasController.update)// rota para alterar um dados espacifico de uma editora pelo id que foi informado


////////////////////////////////////////////////////////////////


module.exports = routes; // exporta as rotas para toda plicação