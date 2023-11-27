const { sequelize } = require('../../database/index.js') 
const { DataTypes } = require('sequelize')

const Clase = sequelize.define('class', { 

       classname: {
            type: DataTypes.STRING,           
        },
        description: {
            type: DataTypes.STRING
        },
        class_Img: {
            type: DataTypes.STRING
        }
      
},
{ //opciones
    updatedAt: false, 
    timestamps: false,
})

module.exports = Clase