const { Op } = require('sequelize');
const Livros = require('../models/Livros')
const sequelize = require('sequelize');

module.exports = {
    // Rota para retonar todos os registros
    async index (req, res) {
        const livros = await Livros.findAll();
        return res.json(livros)
        // função que retona todos os dados
    },

    //Rota para retonar os registros pelo id
    async findByid(req, res) {
        const { titulo } = req.params;
        const livros = await Livros.findAll({
            where: {

                titulo: { [Op.like]: `%${titulo}%` },

            },
        });// findAll = listar dotos os dados / select * from livros
        return res.json(livros)
        // função que retona todos os dados
    },

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

    async dadosGrafico (req, res) {
        try {
        const totalPorAno = await Livros.findAll({ // Obtém ano e soma do preço dos livros, agrupados por ano
              attributes: ['ano', [sequelize.fn('sum', sequelize.col('preco')), 'total']],
              group: ['ano']
            });
        
            res.status(200).json(totalPorAno);
          } catch (error) {
        res.status(400).json({ msg: error.message }); // Retorna status de erro e mensagem
          }
        },

    // async resumoLivros (req, res) {
    //     const livros = await Livros.aggregate('id', 'COUNT', { plain: false, as: 'num' });
    //     livros.soma = await Livros.sum('preco');
    //     livros.maior = await Livros.max('preco');
    //     livros.media = await Livros.average('preco');

    //     return res.status(200).json({
    //         num: livros.num,
    //         soma: livros.soma,
    //         maior: livros.maior,
    //         media: Number(livros.media.toFixed(2))
    //     });
    // }
}



