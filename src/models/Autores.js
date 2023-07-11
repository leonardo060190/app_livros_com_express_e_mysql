const { Model, DataTypes } = require('sequelize')

class Autores extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            data_nascimento: DataTypes.DATE,
            sexo: DataTypes.STRING,
            telefone: DataTypes.STRING,
            descricao: DataTypes.STRING,
            foto: DataTypes.STRING,
        },{
            sequelize
        })
    }

}

module.exports = Autores;