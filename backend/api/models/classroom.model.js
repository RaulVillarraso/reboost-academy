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

        equipments:{
            type: DataTypes.STRING,
            
        },
        
},
{ //opciones
    updatedAt: false, 
    timestamps: false, 
})

module.exports = Classroom