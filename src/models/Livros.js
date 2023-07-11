const { Model, DataTypes } = require('sequelize')

class Livros extends Model {
    static init(sequelize){
        super.init({
            titulo: DataTypes.STRING,
            autor: DataTypes.STRING,
            ano: DataTypes.INTEGER,
            preco: DataTypes.FLOAT,
            foto: DataTypes.STRING
        },{
           sequelize 
        })
    }
}

module.exports = Livros;