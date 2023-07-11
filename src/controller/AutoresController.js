const {Op} = require('sequelize');
const Autores = require('../models/Autores')

module.exports = {
    async index(req, res) {
        const autores = await Autores.findAll();// findAll = listar dotos os dados / select * from livros
        return res.json(autores)
        // função que retona todos os dados
    },

    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { nome } = req.params;
        const autores = await Autores.findAll({
            where: {
                nome: {[Op.like]: `%${nome}%`},
            },
        });
        return res.json(autores)
        // função que retona todos os dados
    },

    //Rota para inserir registros na tabela
    async store(req, res) {
        const { nome, sobrenome, data_nascimento, sexo, telefone, descricao, foto } = req.body;
        const autores = await Autores.create({
            nome,
            sobrenome,
            data_nascimento,
            sexo,
            telefone,
            descricao,
            foto
        });
        return res.json(autores)
        // função que retona todos os dados
    },

    
    //Rota para alterar um resgistro pelo parametro informado
    async update(req, res) {
        const { id } = req.params;
        const autores = await Autores.update({

            telefone: req.body.telefone,

        }, {
            where: {

                id: id
            }
        });// findAll = listar dotos os dados / select * from livros
        return res.json(autores)
        // função que retona todos os dados
    },

    //Rota para deletar o registro pelo id
    async delete(req, res) {
        const { id } = req.params;
        const autores = await Autores.destroy({
            where: {
                id: id
            },
        });
        return res.json(autores)
        // função que retona todos os dados
    },

}