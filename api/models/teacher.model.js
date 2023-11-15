const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Teacher = sequelize.define(
    'teacher',
    {
        firstName: {
            type: DataTypes.STRING,
        },
    
        lastName: {
            type: DataTypes.STRING,
        },
    
        specialization: {
            type: DataTypes.STRING,
        },
        
        email: {
            type: DataTypes.STRING,
            unique: true
        },
    
        phone: {
            type: DataTypes.INTEGER,
            unique: true
        },

    },
    {
        updatedAt: false,   
        createdAt: false,
    }
)

module.exports = Teacher