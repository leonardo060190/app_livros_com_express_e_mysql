const {Model, DataTypes} = require('sequelize')

class Editoras extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            telefone: DataTypes.BIGINT,
            email: DataTypes.STRING,
            rua: DataTypes.STRING,
            numero: DataTypes.INTEGER,
            cep: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING
        },{
            sequelize
        })
    }

}

module.exports = Editoras;