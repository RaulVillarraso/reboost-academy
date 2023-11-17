const { sequelize } = require('../../database/index.js')
const { DataTypes } = require('sequelize')

const Booking = sequelize.define('booking', {  

    bookingDate: {
        type: DataTypes.DATEONLY,
        
    },
    bookingHour: {
        type: DataTypes.TIME,
        
    }
},
    { //opciones
        updatedAt: false, 
        timestamps: false,
    })

module.exports = Booking