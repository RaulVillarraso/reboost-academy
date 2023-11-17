const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User_booking = sequelize.define(
    'user_booking',
    {
       
    },
    {
        updatedAt: false,
    }
)

module.exports = User_booking