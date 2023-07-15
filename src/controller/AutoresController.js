const { Op } = require('sequelize');//Importa a função dos operadores do sequelize
const Autores = require('../models/Autores')//Importa o arquivo Autores da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota que Retorna todos os Registros
    async index(req, res) {
        const autores = await Autores.findAll()//Com o método: findAll você pode ler toda a tabela do banco de dados
        return res.json(autores)// função que retona todos os dados
        
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // async index(req, res) {
    //     try {
    //         const autores = await Autores.findAll();// findAll = listar dotos os dados / select * from livros

    //         if (!autores) {

    //             res.status(401).json({message: 'Não a regitros'})

    //         } else {

    //             res.status(200).json(autores)// função que retona os dados

    //         }
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { nome } = req.params;
        const autores = await Autores.findAll({//Com o método: findAll você pode ler toda a tabela do banco de dados
            where: {
                nome: { [Op.like]: `%${nome}%` },
            },
        });
        return res.json(autores)// função que retona os dados
       
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                res.status(200).json({ autores });// função que retona os dados
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

            const autores = await Autores.findOne({ where: { id } })

            if (!autores) {
                res.status(401).json({ message: 'Este Autor não Consta no Cadastro' });
            } else {
                const autores = await Autores.update({ telefone }, { where: { id } })
                res.status(200).json({ autores });// função que retona os dados
            }

        } catch (error) {
            res.status(400).json({ error });
        }

    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    }

}//Fim do export