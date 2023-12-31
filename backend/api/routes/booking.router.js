const router = require('express').Router()
const { getClassesAndTeachersForBookingDate,getAllBookings, getOneBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/booking.controller')
const { checkAuth, checkAdmin } = require('../middleware')

router.get('/', checkAuth,  getAllBookings)
router.get("/:id", checkAuth, getOneBooking);
router.get('/clase/classroom/:id', checkAuth, getClassesAndTeachersForBookingDate)
router.post("/",  checkAuth, checkAdmin,  createBooking);
router.put("/:id",  checkAuth, updateBooking);
router.delete("/:id",  checkAuth, checkAdmin, deleteBooking);


module.exports = router