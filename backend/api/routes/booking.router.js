const router = require('express').Router()
const { getClassesAndTeachersForBookingDate,getAllBookings, getOneBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/booking.controller')
const { checkAuth, checkAdmin } = require('../middleware')

router.get('/', checkAuth, checkAdmin,  getAllBookings)
router.get("/:id", checkAuth, checkAdmin, getOneBooking);
router.get('/clase/classroom/:id', checkAuth, checkAdmin, getClassesAndTeachersForBookingDate)
router.post("/",  checkAuth, checkAdmin,  createBooking);
router.put("/:id",  checkAuth, checkAdmin, updateBooking);
router.delete("/:id",  checkAuth, checkAdmin, deleteBooking);


module.exports = router