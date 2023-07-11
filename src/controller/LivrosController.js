const { Op } = require('sequelize');
const Livros = require('../models/Livros')

module.exports = {
    // Rota para retonar todos os registros
    async index(req, res) {
        const livros = await Livros.findAll();// findAll = listar dotos os dados / select * from livros
        return res.json(livros)
        // função que retona todos os dados
    },

    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { titulo } = req.params;
        const livros = await Livros.findAll({
            where: {

                titulo: {[Op.like]: `%${titulo}%`},

            },
        });// findAll = listar dotos os dados / select * from livros
        return res.json(livros)
        // função que retona todos os dados
    },

    //Rota para inserir registros na tabela
    async store(req, res) {
        const { titulo, autor, ano, preco, foto } = req.body;
        const livros = await Livros.create({
            titulo,
            autor,
            ano,
            preco,
            foto
        });// findAll = listar dotos os dados / select * from livros
        return res.json(livros)
        // função que retona todos os dados
    },

    //Rota para alterar um resgistro pelo parametro informado
    async update(req, res) {
        const { id } = req.params;
        const livros = await Livros.update({

            preco: req.body.preco

        },{
            where:{

                id: id
            }
        });// findAll = listar dotos os dados / select * from livros
        return res.json(livros)
        // função que retona todos os dados
    },

     //Rota para deletar o registro pelo id
     async delete(req, res) {
        const { id } = req.params;
        const livros = await Livros.destroy({
            where: {
                
                id: id
                
            },
        });// findAll = listar dotos os dados / select * from livros
        return res.json(livros)
        // função que retona todos os dados
    },
    
}
