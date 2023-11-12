const { sequelize } = require('../../database/index.js') 
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', { 

    firstName: {
        type: DataTypes.STRING,
    },

    lastName: {
        type: DataTypes.STRING,
    },

    role: {
        type: DataTypes.ENUM('Admin', 'Client'),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },

    phone: {
        type: DataTypes.INTEGER,
        unique: true
    },

    adress: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

},
    { //opciones
        updatedAt: false, 
    })

module.exports = User