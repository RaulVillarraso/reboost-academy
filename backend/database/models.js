const Suscription = require('../api/models/suscription.model')
const User = require('../api/models/user.model')
const Booking = require('../api/models/booking.model')
const Clase = require('../api/models/clase.model.js')
const Classroom = require('../api/models/classroom.model')
const Class_Teacher = require('../api/models/class_teacher.model')
const User_Booking = require('../api/models/user_booking.model')
const Teacher = require('../api/models/teacher.model')


function addRelationsToModels() {
    try {
        Suscription.hasMany(User)
        User.belongsTo(Suscription)

        User.belongsToMany(Booking, { through: User_Booking})
        Booking.belongsToMany(User, { through: User_Booking})
      
        Clase.hasMany(Booking)
        Booking.belongsTo(Clase)

        Classroom.hasMany(Clase)
        Clase.belongsTo(Classroom)

        Teacher.belongsToMany(Clase, { through: Class_Teacher})
        Clase.belongsToMany(Teacher, { through: Class_Teacher})
       
        console.log('Relations added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = { addRelationsToModels } 