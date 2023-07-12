const { Op } = require('sequelize');
const Editoras = require('../models/Editoras')

module.exports = {

    async index(req, res) {
        const editoras = await Editoras.findAll();// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },

    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { nome } = req.params;
        const editoras = await Editoras.findAll({
            where: {
                nome: {[Op.like]: `%${nome}%`},
            },
        });// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },

    //Rota para inserir registros na tabela
    async store(req, res) {
        const { nome, telefone, rua, numero, cep, bairro, cidade, estado } = req.body;
        const editoras = await Editoras.create({
            nome,
            telefone,
            rua,
            numero,
            cep,
            bairro,
            cidade,
            estado
        });// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },
 
    //Rota para alterar um resgistro pelo parametro informado
    async update(req, res) {
        const { id } = req.params;
        const editoras = await Editoras.update({

            telefone: req.body.telefone

        }, {
            where: {

                id: id
            }
        });// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },

    //Rota para deletar o registro pelo id
    async delete(req, res) {
        const { id } = req.params;
        const editoras = await Editoras.destroy({
            where: {
                id: id
            },
        });// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },
}