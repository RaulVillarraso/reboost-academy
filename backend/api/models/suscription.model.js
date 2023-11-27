const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Suscription = sequelize.define(
    'suscription',
    {
        suscription_Type: {
            type: DataTypes.STRING,
            unique: true
        },
        cost: {
            type: DataTypes.INTEGER
        },
        suscription_Description: {
            type: DataTypes.STRING
        },
        suscription_Img: {
            type: DataTypes.STRING
        }
        ,
        suscription_pay: {
            type: DataTypes.STRING
        }
    },
    {
        updatedAt: false,
        timestamps: false
    }
)

module.exports = Suscription