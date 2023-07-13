const { Op } = require('sequelize');
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
                nome: { [Op.like]: `%${nome}%` },
            },
        });
        return res.json(autores)
        // função que retona todos os dados
    },

    //Rota para inserir registros na tabela
    async store(req, res) {
        try {
            const { nome, sobrenome, data_nascimento, sexo, telefone, descricao, foto } = req.body;
            const autores = await Autores.findOne({ where: { telefone } })

            if (autores) {
                res.status(401).json({ message: 'Este Autor já existe no Cadastro' });

            } else {
                const autores = await Autores.create({
                    nome,
                    sobrenome,
                    data_nascimento,
                    sexo,
                    telefone,
                    descricao,
                    foto
                });
                res.status(200).json({ autores });
            }

        } catch (error) {
            res.status(400).json({ error });
        }

    },


    //Rota para alterar um resgistro pelo parametro informado
    async update(req, res) {
        try {
            const { id } = req.params;
            const { telefone } = req.body;

            const autores = await Autores.findOne({ where: { id } })

            if (!autores) {
                res.status(401).json({ message: 'Este Autor não Consta no Cadastro' });
            } else {
                const autores = await Autores.update({ telefone }, { where: { id } })
                res.status(200).json({ autores });
            }

        } catch (error) {
            res.status(400).json({ error });
        }

    },

    //Rota para deletar o registro pelo id
    async delete(req, res) {
        const { id } = req.params;

        const autores = await Autores.findOne({ where: { id } })

        if (!autores) {
            res.status(401).json({ message: 'Autor não Encontrado' });
        } else {
            await Autores.destroy({ where: { id } })
            res.status(200).json({ ok: true });
        }

    },

}