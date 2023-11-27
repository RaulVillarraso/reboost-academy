const { Op } = require('sequelize')
const Booking = require('../models/booking.model')
const Clase = require('../models/clase.model')
const Teacher = require('../models/teacher.model')
const Classroom = require('../models/classroom.model')

//CRUD

async function getAllBookings(req, res) {
    try {
        const booking = await Booking.findAll()
        if (booking.length !== 0) {
            return res.status(200).json(booking)
        } else {
            return res.status(200).send('There are no bookings')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneBooking(req, res) {
    try {
        const booking = await Booking.findByPk(req.params.id)
        if (booking) {
            return res.status(200).json(booking)
        } else {
            return res.status(200).send('No booking found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createBooking(req, res) {
    try {
        const booking = await Booking.create(req.body)
        res.status(200).send('Booking created sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateBooking(req, res) {
    try {
        const booking = await Booking.findByPk(req.params.id)
        booking.update(req.body)
        res.status(200).send('Booking updated successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteBooking(req, res) {
    try {
        const booking = await Booking.findByPk(req.params.id)
        booking.destroy()
        res.status(200).send('Booking deleted sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function getClassesAndTeachersForBookingDate(req, res) {
    try {
      const bookingId = req.params.id;
  

      const booking = await Booking.findByPk(bookingId, {
        include: [
          {
            model: Clase,
            include: [
              {
                model: Classroom,
              },
              {
                model: Teacher,
              },
            ],
          },
        ],
      });
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json({
        booking,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }}

module.exports = {
    getClassesAndTeachersForBookingDate,
    getAllBookings,
    getOneBooking,
    createBooking,
    updateBooking,
    deleteBooking,
}