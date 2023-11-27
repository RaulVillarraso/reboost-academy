const { sequelize } = require('../../database/index.js')
const { DataTypes } = require('sequelize')

const Booking = sequelize.define('booking', {  

    start: {
        type: DataTypes.DATE, 
        allowNull: false,
    },
  
    end: {
        type: DataTypes.DATE, 
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    clase: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    targeted:{
            type: DataTypes.INTEGER
        },

},
    { 
        updatedAt: false, 
        timestamps: false,
    })

module.exports = Booking