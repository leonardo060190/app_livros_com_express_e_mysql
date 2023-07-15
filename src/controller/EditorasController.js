const { Op } = require('sequelize');//Importa a função dos operadores
const Editoras = require('../models/Editoras');//Importa o arquivo Editoras da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota que Retorna todos os Registros
    async index(req, res) {
        const editoras = await Editoras.findAll();// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // async index(req, res) {
    //     try {
    //         const editoras = await Editoras.findAll();// findAll = listar dotos os dados / select * from livros

    //         if (!editoras) {
    //             res.status(401).json({ message: 'Não Conten nenhum registro' })

    //         } else {

    //             res.status(200).json({ editoras });
    //         }

    //     } catch (error) {
    //         res.status(400).json({ error })
    //     }

    // },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { nome } = req.params;
        const editoras = await Editoras.findAll({
            where: {
                nome: { [Op.like]: `%${nome}%` },
            },
        });// findAll = listar dotos os dados / select * from livros
        return res.json(editoras)
        // função que retona todos os dados
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para inserir registros na tabela
    async store(req, res) {
        try {
            const { nome, telefone, email, rua, numero, cep, bairro, cidade, estado } = req.body;
            const editoras = await Editoras.findOne({ where: { email } })

            if (editoras) {
                res.status(401).json({ message: 'Esta Editora já Consta no Cadastro' });
            } else {

                const editoras = await Editoras.create({
                    nome,
                    telefone,
                    email,
                    rua,
                    numero,
                    cep,
                    bairro,
                    cidade,
                    estado
                });
                res.status(200).json({ editoras });
            }

        } catch (error) {
            res.status(400).json({ error });
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para alterar um resgistro pelo parametro informado
    async update(req, res) {

        try {
            const { id } = req.params;
            const { telefone } = req.body;

            const editoras = await Editoras.findOne({ where: { id } })

            if (!editoras) {
                res.status(401).json({ message: 'Este Editora não Consta no Cadastro' });

            } else {
                const editoras = await Editoras.update({ telefone }, { where: { id } });
                res.status(200).json({ editoras });
            }

        } catch (error) {
            res.status(400).json({ error });
        }

    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para deletar o registro pelo id
    async delete(req, res) {
        const { id } = req.params;

        const editoras = await Editoras.findOne({ where: { id } })

        if (!editoras) {
            res.status(401).json({ message: 'Editora não Encontrada' });
        } else {
            await Editoras.destroy({ where: { id } });

            res.status(200).json({ ok: true });
        }

    }
}//Fim do export