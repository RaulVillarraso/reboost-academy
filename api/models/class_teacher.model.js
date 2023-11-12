const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Class_teacher = sequelize.define(
    'class_teacher',
    {
       
    },
    {
        updatedAt: false, 
        createdAt: false,
    }
)

module.exports = Class_teacher