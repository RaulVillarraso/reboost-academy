const { sequelize } = require('../../database/index.js') 
const { DataTypes } = require('sequelize')

const Classroom = sequelize.define('classroom', { 

        classroomName: {
            type: DataTypes.STRING,
            
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        targeted:{
            type: DataTypes.INTEGER
        },

        equipments:{
            type: DataTypes.STRING,
            
        },
        
},
{ //opciones
    updatedAt: false, 
    timestamps: false, 
})

module.exports = Classroom