const router = require('express').Router()
const { getClassesAndTeachersForBookingDate,getAllBookings, getOneBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/booking.controller')

router.get('/', getAllBookings)
router.get('/:id', getOneBooking)
router.get('/clase/:bookingDate', getClassesAndTeachersForBookingDate)
router.post('/', createBooking)
router.put('/:id',updateBooking)
router.delete('/:id', deleteBooking)


module.exports = router