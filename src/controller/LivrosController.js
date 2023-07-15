const { Op } = require('sequelize');//Importa a função dos operadores
const Livros = require('../models/Livros')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para retonar todos os registros
    async index(req, res) {

        const livros = await Livros.findAll();//Com o método: findAll você pode ler toda a tabela do banco de dados

        return res.json(livros)
        // função que retona todos os dados
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // async index(req, res) {
    //     try {
    //         const livros = await Livros.findAll();//Com o método: findAll você pode ler toda a tabela do banco de dados

    //         if (!livros) {

    //             res.status(401).json({ message: 'Não Conten nenhum registro' })

    //         }else{

    //            res.status(200).json({ livros }) 
    //         }

    //     } catch (error) {
    //         res.status(400).json({ error })
    //     }

    // },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { titulo } = req.params;
        const livros = await Livros.findAll({//Com o método: findAll você pode ler toda a tabela do banco de dados
            where: {

                titulo: { [Op.like]: `%${titulo}%` },

            },
        });
        return res.json(livros)
        // função que retona todos os dados
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para inserir registros na tabela
    async store(req, res) {
        try {
            const { titulo, autor, ano, preco, foto } = req.body;
            const livros = await Livros.findOne({ where: { titulo } })

            if (livros) {
                res.status(401).json({ message: 'Este Titulo já existe no Cadastro' });
            } else {
                const livros = await Livros.create({
                    titulo,
                    autor,
                    ano,
                    preco,
                    foto
                });
                res.status(200).json({ livros });
            }

        } catch (error) {
            res.status(400).json({ error });
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////    
    //Rota para alterar um resgistro pelo parametro informado
    async update(req, res) {
        try {
            const { id } = req.params;
            const { preco } = req.body

            const livros = await Livros.findOne({ where: { id } })

            if (!livros) {

                res.status(401).json({ message: 'Este Titulo não Consta no Cadastro' });

            } else {

                const livros = await Livros.update({ preco }, { where: { id } })
                res.status(200).json({ livros });
            }

        } catch (error) {

            res.status(400).json({ error });
        }

    },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para deletar o registro pelo id
    async delete(req, res) {
        const { id } = req.params;

        const livros = await Livros.findOne({ where: { id } })

        if (!livros) {
            res.status(401).json({ message: 'Titulo não Encontrado' });
        } else {
            await Livros.destroy({ where: { id } })
            res.status(200).json({ ok: true });
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////        
    //Rota de dados para o grafico
    async dadosGrafico(req, res) {
        try {
            const totalPorAno = await Livros.findAll({//Com o método: findAll você pode ler toda a tabela do banco de dados
                attributes: ['ano', [sequelize.fn('sum', sequelize.col('preco')), 'total']],// Obtém ano e soma do preço dos livros, agrupados por ano
                group: ['ano']
            });

            res.status(200).json(totalPorAno);
        } catch (error) {
            res.status(400).json({ msg: error.message }); // Retorna status de erro e mensagem
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////    
    //Rota para o dados de livros
    // async dadosLivros(req, res) {
    //     try {
    //         const livros = await Livros.findAll({
    //             attributes: [

    //                 ['id'[sequelize.literal('COUNT(*)'), num]],
    //                 ['preco'[sequelize.fn('SUM', model.sequelize.col('preco')), soma]],
    //                 ['preco'[sequelize.fn('MAX', model.sequelize.col('preco')), maior]],
    //                 ['preco'[sequelize.fn('AVG', model.sequelize.col('preco')), media]]

    //             ],
    //             group: ['id']
    //         });

    //         const { num, soma, maior, media } = livros[0];
    //         res.status(200).json({ num, soma, maior, media: Number(media.toFixed(2)) });
    //     } catch (error) {
    //         res.status(400).json({ msg: error.message });
    //     }
    // }

};//fim do export

