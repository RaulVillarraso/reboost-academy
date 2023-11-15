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
        }
    },
    {
        updatedAt: false,
    }
)

module.exports = Suscription