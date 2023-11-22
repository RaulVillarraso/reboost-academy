const { sequelize } = require('../../database/index.js')
const { DataTypes } = require('sequelize')

const Booking = sequelize.define('booking', {  

    start: {
        type: DataTypes.DATE, 
        
    },
  
    end: {
        type: DataTypes.DATE, 
        
    },

    title: {
        type: DataTypes.STRING, 
        
    },
    clase: {
        type: DataTypes.STRING, 
        
    },

},
    { 
        updatedAt: false, 
        timestamps: false,
    })

module.exports = Booking